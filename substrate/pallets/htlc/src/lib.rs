#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
    dispatch::DispatchResult,
    traits::{Get, Currency, ReservableCurrency, ExistenceRequirement, ConstU32},
    pallet_prelude::*,
    BoundedVec,
};
use frame_system::pallet_prelude::*;
use sp_std::{vec::Vec, collections::btree_map::BTreeMap};
use sp_runtime::{
    traits::{Zero, BlakeTwo256, Hash},
    RuntimeDebug, DispatchError,
};
use sp_io::hashing::keccak_256;
use codec::{Encode, Decode, MaxEncodedLen};
use scale_info::TypeInfo;

pub use pallet::*;

type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

// Fixed struct with proper derives and bounds
#[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo)]
#[scale_info(skip_type_params(T))]
pub struct HashTimeLockContract<AccountId, Balance, BlockNumber> 
where
    AccountId: Encode + Decode + Clone + PartialEq + Eq + core::fmt::Debug + TypeInfo,
    Balance: Encode + Decode + Clone + PartialEq + Eq + core::fmt::Debug + TypeInfo,
    BlockNumber: Encode + Decode + Clone + PartialEq + Eq + core::fmt::Debug + TypeInfo,
{
    pub sender: AccountId,
    pub recipient: AccountId,
    pub amount: Balance,
    pub hashlock: [u8; 32],
    pub timelock: BlockNumber,
    pub withdrawn: bool,
    pub refunded: bool,
    pub preimage: Option<BoundedVec<u8, ConstU32<256>>>,
    pub ethereum_swap_id: Option<[u8; 32]>,
}

// Implement MaxEncodedLen manually since we can't derive it with generic parameters
impl<AccountId, Balance, BlockNumber> MaxEncodedLen for HashTimeLockContract<AccountId, Balance, BlockNumber>
where
    AccountId: Encode + Decode + Clone + PartialEq + Eq + core::fmt::Debug + TypeInfo + MaxEncodedLen,
    Balance: Encode + Decode + Clone + PartialEq + Eq + core::fmt::Debug + TypeInfo + MaxEncodedLen,
    BlockNumber: Encode + Decode + Clone + PartialEq + Eq + core::fmt::Debug + TypeInfo + MaxEncodedLen,
{
    fn max_encoded_len() -> usize {
        AccountId::max_encoded_len()
            .saturating_add(AccountId::max_encoded_len()) // recipient
            .saturating_add(Balance::max_encoded_len()) // amount
            .saturating_add(32) // hashlock
            .saturating_add(BlockNumber::max_encoded_len()) // timelock
            .saturating_add(1) // withdrawn bool
            .saturating_add(1) // refunded bool
            .saturating_add(
                // Option<BoundedVec<u8, ConstU32<256>>>
                1_usize.saturating_add(256_usize.saturating_add(4)) // 1 for Option discriminant + 256 bytes + 4 for length
            )
            .saturating_add(
                // Option<[u8; 32]>
                1_usize.saturating_add(32) // 1 for Option discriminant + 32 bytes
            )
    }
}

#[frame_support::pallet]
pub mod pallet {
    use super::*;

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
        type Currency: Currency<Self::AccountId> + ReservableCurrency<Self::AccountId>;
        type MinTimelock: Get<BlockNumberFor<Self>>;
        type MaxTimelock: Get<BlockNumberFor<Self>>;
    }

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::storage]
    #[pallet::getter(fn htlcs)]
    /// Map from hashlock to HTLC details
    pub type HTLCs<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        [u8; 32],
        HashTimeLockContract<T::AccountId, BalanceOf<T>, BlockNumberFor<T>>,
    >;

    #[pallet::storage]
    #[pallet::getter(fn preimage_to_hashlock)]
    /// Map from preimage hash to the original hashlock (for reverse lookup)
    pub type PreimageToHashlock<T: Config> = StorageMap<_, Blake2_128Concat, [u8; 32], [u8; 32]>;

    #[pallet::storage]
    #[pallet::getter(fn account_htlcs)]
    /// Active HTLCs by account (for cleanup and querying)
    pub type AccountHTLCs<T: Config> = StorageDoubleMap<
        _,
        Blake2_128Concat,
        T::AccountId,
        Blake2_128Concat,
        [u8; 32],
        (),
    >;

    #[pallet::storage]
    #[pallet::getter(fn htlc_count)]
    /// Counter for total HTLCs created
    pub type HTLCCount<T: Config> = StorageValue<_, u64, ValueQuery>;

    #[pallet::storage]
    #[pallet::getter(fn ethereum_bridge)]
    /// Ethereum integration settings
    pub type EthereumBridge<T: Config> = StorageValue<_, T::AccountId>;

    #[pallet::storage]
    #[pallet::getter(fn trusted_relayers)]
    pub type TrustedRelayers<T: Config> = StorageMap<_, Blake2_128Concat, T::AccountId, bool, ValueQuery>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// HTLC created [hashlock, sender, recipient, amount, timelock]
        HTLCCreated {
            hashlock: [u8; 32],
            sender: T::AccountId,
            recipient: T::AccountId,
            amount: BalanceOf<T>,
            timelock: BlockNumberFor<T>,
        },
        
        /// HTLC withdrawn [hashlock, preimage, recipient]
        HTLCWithdrawn {
            hashlock: [u8; 32],
            preimage: BoundedVec<u8, ConstU32<256>>,
            recipient: T::AccountId,
        },
        
        /// HTLC refunded [hashlock, sender]
        HTLCRefunded {
            hashlock: [u8; 32],
            sender: T::AccountId,
        },
        
        /// Ethereum swap linked [hashlock, ethereum_swap_id]
        EthereumSwapLinked {
            hashlock: [u8; 32],
            ethereum_swap_id: [u8; 32],
        },
        
        /// Trusted relayer updated [account, is_trusted]
        TrustedRelayerUpdated {
            account: T::AccountId,
            is_trusted: bool,
        },
    }

    #[pallet::error]
    pub enum Error<T> {
        /// HTLC already exists for this hashlock
        HTLCAlreadyExists,
        /// HTLC does not exist
        HTLCNotFound,
        /// HTLC has already been withdrawn
        AlreadyWithdrawn,
        /// HTLC has already been refunded
        AlreadyRefunded,
        /// Timelock has not expired yet
        TimelockNotExpired,
        /// Timelock has already expired
        TimelockExpired,
        /// Invalid preimage for hashlock
        InvalidPreimage,
        /// Timelock is too short
        TimelockTooShort,
        /// Timelock is too long
        TimelockTooLong,
        /// Insufficient balance
        InsufficientBalance,
        /// Not authorized (for relayer functions)
        NotAuthorized,
        /// Invalid hashlock format
        InvalidHashlock,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Create a new Hash Time Lock Contract
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn new_htlc(
            origin: OriginFor<T>,
            recipient: T::AccountId,
            hashlock: [u8; 32],
            timelock: BlockNumberFor<T>,
            #[pallet::compact] amount: BalanceOf<T>,
            ethereum_swap_id: Option<[u8; 32]>,
        ) -> DispatchResult {
            let sender = ensure_signed(origin)?;

            // Validate timelock
            let current_block = <frame_system::Pallet<T>>::block_number();
            ensure!(
                timelock >= current_block + T::MinTimelock::get(),
                Error::<T>::TimelockTooShort
            );
            ensure!(
                timelock <= current_block + T::MaxTimelock::get(),
                Error::<T>::TimelockTooLong
            );

            // Validate amount
            ensure!(!amount.is_zero(), Error::<T>::InsufficientBalance);

            // Check HTLC doesn't already exist
            ensure!(!HTLCs::<T>::contains_key(&hashlock), Error::<T>::HTLCAlreadyExists);

            // Reserve funds from sender
            T::Currency::reserve(&sender, amount)?;

            // Create HTLC
            let htlc = HashTimeLockContract {
                sender: sender.clone(),
                recipient: recipient.clone(),
                amount,
                hashlock,
                timelock,
                withdrawn: false,
                refunded: false,
                preimage: None,
                ethereum_swap_id,
            };

            // Store HTLC
            HTLCs::<T>::insert(&hashlock, &htlc);
            AccountHTLCs::<T>::insert(&sender, &hashlock, ());
            HTLCCount::<T>::mutate(|count| *count = count.saturating_add(1));

            // Emit event
            Self::deposit_event(Event::HTLCCreated {
                hashlock,
                sender,
                recipient,
                amount,
                timelock,
            });

            // Link to Ethereum swap if provided
            if let Some(eth_swap_id) = ethereum_swap_id {
                Self::deposit_event(Event::EthereumSwapLinked {
                    hashlock,
                    ethereum_swap_id: eth_swap_id,
                });
            }

            Ok(())
        }

        /// Withdraw funds from HTLC by revealing preimage
        #[pallet::call_index(1)]
        #[pallet::weight(10_000)]
        pub fn withdraw(
            origin: OriginFor<T>,
            hashlock: [u8; 32],
            preimage: BoundedVec<u8, ConstU32<256>>,
        ) -> DispatchResult {
            let _withdrawer = ensure_signed(origin)?;

            // Get HTLC
            let mut htlc = Self::htlcs(&hashlock).ok_or(Error::<T>::HTLCNotFound)?;

            // Check not already withdrawn or refunded
            ensure!(!htlc.withdrawn, Error::<T>::AlreadyWithdrawn);
            ensure!(!htlc.refunded, Error::<T>::AlreadyRefunded);

            // Check timelock hasn't expired
            let current_block = <frame_system::Pallet<T>>::block_number();
            ensure!(current_block < htlc.timelock, Error::<T>::TimelockExpired);

            // Verify preimage
            let computed_hashlock = keccak_256(&preimage.to_vec());
            ensure!(computed_hashlock == hashlock, Error::<T>::InvalidPreimage);

            // Update HTLC state
            htlc.withdrawn = true;
            htlc.preimage = Some(preimage.clone());
            HTLCs::<T>::insert(&hashlock, &htlc);

            // Create reverse lookup
            PreimageToHashlock::<T>::insert(computed_hashlock, hashlock);

            // Unreserve and transfer funds
            T::Currency::unreserve(&htlc.sender, htlc.amount);
            T::Currency::transfer(
                &htlc.sender,
                &htlc.recipient,
                htlc.amount,
                ExistenceRequirement::AllowDeath,
            )?;

            // Emit event
            Self::deposit_event(Event::HTLCWithdrawn {
                hashlock,
                preimage,
                recipient: htlc.recipient,
            });

            Ok(())
        }

        /// Refund HTLC after timelock expires
        #[pallet::call_index(2)]
        #[pallet::weight(10_000)]
        pub fn refund(
            origin: OriginFor<T>,
            hashlock: [u8; 32],
        ) -> DispatchResult {
            let _refunder = ensure_signed(origin)?;

            // Get HTLC
            let mut htlc = Self::htlcs(&hashlock).ok_or(Error::<T>::HTLCNotFound)?;

            // Check not already withdrawn or refunded
            ensure!(!htlc.withdrawn, Error::<T>::AlreadyWithdrawn);
            ensure!(!htlc.refunded, Error::<T>::AlreadyRefunded);

            // Check timelock has expired
            let current_block = <frame_system::Pallet<T>>::block_number();
            ensure!(current_block >= htlc.timelock, Error::<T>::TimelockNotExpired);

            // Update HTLC state
            htlc.refunded = true;
            HTLCs::<T>::insert(&hashlock, &htlc);

            // Unreserve funds back to sender
            T::Currency::unreserve(&htlc.sender, htlc.amount);

            // Clean up storage
            AccountHTLCs::<T>::remove(&htlc.sender, &hashlock);

            // Emit event
            Self::deposit_event(Event::HTLCRefunded {
                hashlock,
                sender: htlc.sender,
            });

            Ok(())
        }

        /// Batch create multiple HTLCs (for efficiency)
        #[pallet::call_index(3)]
        #[pallet::weight(50_000)]
        pub fn batch_new_htlc(
            origin: OriginFor<T>,
            htlcs: Vec<(T::AccountId, [u8; 32], BlockNumberFor<T>, BalanceOf<T>, Option<[u8; 32]>)>,
        ) -> DispatchResult {
            let sender = ensure_signed(origin)?;

            for (recipient, hashlock, timelock, amount, ethereum_swap_id) in htlcs {
                // Create a new origin for each call
                let origin_clone = frame_system::RawOrigin::Signed(sender.clone()).into();
                Self::new_htlc(
                    origin_clone,
                    recipient,
                    hashlock,
                    timelock,
                    amount,
                    ethereum_swap_id,
                )?;
            }

            Ok(())
        }

        /// Set trusted relayer (only root)
        #[pallet::call_index(4)]
        #[pallet::weight(10_000)]
        pub fn set_trusted_relayer(
            origin: OriginFor<T>,
            relayer: T::AccountId,
            is_trusted: bool,
        ) -> DispatchResult {
            ensure_root(origin)?;
            
            TrustedRelayers::<T>::insert(&relayer, is_trusted);
            Self::deposit_event(Event::TrustedRelayerUpdated {
                account: relayer,
                is_trusted,
            });
            
            Ok(())
        }

        /// Create HTLC from Ethereum event (relayer only)
        #[pallet::call_index(5)]
        #[pallet::weight(15_000)]
        pub fn create_from_ethereum(
            origin: OriginFor<T>,
            recipient: T::AccountId,
            hashlock: [u8; 32],
            timelock: BlockNumberFor<T>,
            #[pallet::compact] amount: BalanceOf<T>,
            ethereum_swap_id: [u8; 32],
            _ethereum_block_hash: [u8; 32],
        ) -> DispatchResult {
            let relayer = ensure_signed(origin)?;
            
            // Verify relayer is trusted
            ensure!(Self::trusted_relayers(&relayer), Error::<T>::NotAuthorized);

            // Create HTLC with relayer as sender (they provide the funds)
            let origin_clone = frame_system::RawOrigin::Signed(relayer).into();
            Self::new_htlc(
                origin_clone,
                recipient,
                hashlock,
                timelock,
                amount,
                Some(ethereum_swap_id),
            )?;

            Ok(())
        }
    }

    impl<T: Config> Pallet<T> {
        /// Get HTLC details by hashlock
        pub fn get_htlc(hashlock: &[u8; 32]) -> Option<HashTimeLockContract<T::AccountId, BalanceOf<T>, BlockNumberFor<T>>> {
            Self::htlcs(hashlock)
        }

        /// Check if HTLC can be withdrawn
        pub fn can_withdraw(hashlock: &[u8; 32]) -> bool {
            if let Some(htlc) = Self::htlcs(hashlock) {
                let current_block = <frame_system::Pallet<T>>::block_number();
                !htlc.withdrawn && !htlc.refunded && current_block < htlc.timelock
            } else {
                false
            }
        }

        /// Check if HTLC can be refunded
        pub fn can_refund(hashlock: &[u8; 32]) -> bool {
            if let Some(htlc) = Self::htlcs(hashlock) {
                let current_block = <frame_system::Pallet<T>>::block_number();
                !htlc.withdrawn && !htlc.refunded && current_block >= htlc.timelock
            } else {
                false
            }
        }

        /// Get all HTLCs for an account
        pub fn get_account_htlcs(account: &T::AccountId) -> Vec<[u8; 32]> {
            AccountHTLCs::<T>::iter_prefix(account)
                .map(|(hashlock, _)| hashlock)
                .collect()
        }

        /// Validate hashlock format
        pub fn is_valid_hashlock(hashlock: &[u8; 32]) -> bool {
            // Basic validation - ensure it's not all zeros
            hashlock != &[0u8; 32]
        }

        /// Clean up expired HTLCs (can be called by anyone)
        pub fn cleanup_expired_htlcs(limit: u32) -> u32 {
            let current_block = <frame_system::Pallet<T>>::block_number();
            let mut cleaned = 0u32;
            
            for (hashlock, htlc) in HTLCs::<T>::iter() {
                if cleaned >= limit {
                    break;
                }
                
                if !htlc.withdrawn && !htlc.refunded && current_block >= htlc.timelock {
                    // Auto-refund expired HTLC
                    let mut updated_htlc = htlc.clone();
                    updated_htlc.refunded = true;
                    HTLCs::<T>::insert(&hashlock, &updated_htlc);
                    
                    // Unreserve funds
                    let _ = T::Currency::unreserve(&htlc.sender, htlc.amount);
                    
                    // Clean up storage
                    AccountHTLCs::<T>::remove(&htlc.sender, &hashlock);
                    
                    cleaned = cleaned.saturating_add(1);
                }
            }
            
            cleaned
        }
    }
}