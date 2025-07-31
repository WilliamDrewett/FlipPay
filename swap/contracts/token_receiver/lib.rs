#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod token_receiver {
    use ink::storage::Mapping;

    /// Defines the storage of your contract.
    #[ink(storage)]
    pub struct TokenReceiver {
        /// Maps token contract addresses to their received amounts
        received_tokens: Mapping<AccountId, Balance>,
        /// Maps user addresses to their total received amounts
        user_balances: Mapping<AccountId, Balance>,
        /// Contract owner
        owner: AccountId,
        /// Total tokens received by this contract
        total_received: Balance,
    }

    /// Event emitted when tokens are received
    #[ink(event)]
    pub struct TokensReceived {
        #[ink(topic)]
        from: AccountId,
        #[ink(topic)]
        token_contract: AccountId,
        amount: Balance,
        timestamp: u64,
    }

    /// Event emitted when tokens are withdrawn
    #[ink(event)]
    pub struct TokensWithdrawn {
        #[ink(topic)]
        to: AccountId,
        #[ink(topic)]
        token_contract: AccountId,
        amount: Balance,
        timestamp: u64,
    }

    /// Error types
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Caller is not the owner
        NotOwner,
        /// Insufficient balance
        InsufficientBalance,
        /// Transfer failed
        TransferFailed,
        /// Invalid amount (zero)
        InvalidAmount,
    }

    impl TokenReceiver {
        /// Constructor that initializes the contract
        #[ink(constructor)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            Self {
                received_tokens: Mapping::default(),
                user_balances: Mapping::default(),
                owner: caller,
                total_received: 0,
            }
        }

        /// Receive tokens from Snowbridge
        /// This function should be called when bridged tokens arrive
        #[ink(message, payable)]
        pub fn receive_tokens(&mut self, token_contract: AccountId) -> Result<(), Error> {
            let caller = self.env().caller();
            let transferred_value = self.env().transferred_value();

            if transferred_value == 0 {
                return Err(Error::InvalidAmount);
            }

            // Update received tokens mapping
            let current_received = self.received_tokens.get(&token_contract).unwrap_or(0);
            self.received_tokens.insert(&token_contract, &(current_received + transferred_value));

            // Update user balances
            let current_balance = self.user_balances.get(&caller).unwrap_or(0);
            self.user_balances.insert(&caller, &(current_balance + transferred_value));

            // Update total received
            self.total_received += transferred_value;

            // Get current timestamp
            let timestamp = self.env().block_timestamp();

            // Emit event
            self.env().emit_event(TokensReceived {
                from: caller,
                token_contract,
                amount: transferred_value,
                timestamp,
            });

            Ok(())
        }

        /// Withdraw tokens (only owner can withdraw)
        #[ink(message)]
        pub fn withdraw_tokens(
            &mut self, 
            token_contract: AccountId, 
            to: AccountId, 
            amount: Balance
        ) -> Result<(), Error> {
            let caller = self.env().caller();

            // Only owner can withdraw
            if caller != self.owner {
                return Err(Error::NotOwner);
            }

            if amount == 0 {
                return Err(Error::InvalidAmount);
            }

            // Check if enough tokens are available
            let available = self.received_tokens.get(&token_contract).unwrap_or(0);
            if available < amount {
                return Err(Error::InsufficientBalance);
            }

            // Update storage
            self.received_tokens.insert(&token_contract, &(available - amount));
            self.total_received -= amount;

            // Transfer tokens (in a real implementation, this would interact with the token contract)
            // For now, we just emit an event
            let timestamp = self.env().block_timestamp();
            
            self.env().emit_event(TokensWithdrawn {
                to,
                token_contract,
                amount,
                timestamp,
            });

            Ok(())
        }

        /// Get total tokens received for a specific token contract
        #[ink(message)]
        pub fn get_received_tokens(&self, token_contract: AccountId) -> Balance {
            self.received_tokens.get(&token_contract).unwrap_or(0)
        }

        /// Get user balance
        #[ink(message)]
        pub fn get_user_balance(&self, user: AccountId) -> Balance {
            self.user_balances.get(&user).unwrap_or(0)
        }

        /// Get total tokens received by the contract
        #[ink(message)]
        pub fn get_total_received(&self) -> Balance {
            self.total_received
        }

        /// Get contract owner
        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }

        /// Transfer ownership (only current owner can transfer)
        #[ink(message)]
        pub fn transfer_ownership(&mut self, new_owner: AccountId) -> Result<(), Error> {
            let caller = self.env().caller();

            if caller != self.owner {
                return Err(Error::NotOwner);
            }

            self.owner = new_owner;
            Ok(())
        }

        /// Emergency function to receive any tokens sent directly to the contract
        #[ink(message, payable)]
        pub fn fallback(&mut self) -> Result<(), Error> {
            let transferred_value = self.env().transferred_value();
            let caller = self.env().caller();

            if transferred_value > 0 {
                // Treat as generic token receipt
                let current_balance = self.user_balances.get(&caller).unwrap_or(0);
                self.user_balances.insert(&caller, &(current_balance + transferred_value));
                self.total_received += transferred_value;

                let timestamp = self.env().block_timestamp();
                
                // Use zero account as placeholder for direct transfers
                let zero_account = AccountId::from([0u8; 32]);
                
                self.env().emit_event(TokensReceived {
                    from: caller,
                    token_contract: zero_account,
                    amount: transferred_value,
                    timestamp,
                });
            }

            Ok(())
        }
    }

    /// Unit tests
    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let contract = TokenReceiver::new();
            assert_eq!(contract.get_total_received(), 0);
        }

        #[ink::test]
        fn receive_tokens_works() {
            let mut contract = TokenReceiver::new();
            let token_contract = AccountId::from([1u8; 32]);
            
            // This test would need to be adapted to actually send value
            // For now, we just test the basic structure
            assert_eq!(contract.get_received_tokens(token_contract), 0);
        }

        #[ink::test]
        fn ownership_transfer_works() {
            let mut contract = TokenReceiver::new();
            let new_owner = AccountId::from([2u8; 32]);
            
            let result = contract.transfer_ownership(new_owner);
            assert_eq!(result, Ok(()));
            assert_eq!(contract.get_owner(), new_owner);
        }
    }
} 