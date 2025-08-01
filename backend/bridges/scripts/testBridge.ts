#!/usr/bin/env npx ts-node
/**
 * Simple test script to verify StarkGate bridge works with real token addresses
 * 
 * Usage:
 *   npx ts-node backend/bridges/scripts/testBridge.ts
 */

import * as dotenv from 'dotenv';
dotenv.config();

// Import the updated bridge function
import { bridgeTokens } from './bridgeEthToStarknet';

// Real token addresses for testing
const REAL_TOKENS = {
  sepolia: {
    USDC: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
    ETH: '0x0000000000000000000000000000000000000000'
  },
  mainnet: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    ETH: '0x0000000000000000000000000000000000000000'
  }
};

async function testBridgeWithRealTokens() {
  console.log('🧪 Testing StarkGate bridge with REAL token addresses...\n');

  // Test parameters
  const testParams = {
    network: 'sepolia',
    tokenAddress: REAL_TOKENS.sepolia.USDC, // Real USDC on Sepolia
    recipient: '0x1234567890123456789012345678901234567890123456789012345678901234', // Dummy Starknet address
    amount: '1000000', // 1 USDC (6 decimals)
    privateKey: process.env.ETHEREUM_KEY!
  };

  console.log('Test Parameters:');
  console.log('Network:', testParams.network);
  console.log('Token:', testParams.tokenAddress, '(Real USDC Sepolia)');
  console.log('Recipient:', testParams.recipient);
  console.log('Amount:', testParams.amount, 'wei (1 USDC)');
  console.log('');

  // Validate environment
  if (!process.env.ETHEREUM_KEY) {
    console.error('❌ Missing ETHEREUM_KEY environment variable');
    process.exit(1);
  }

  if (!process.env.INFURA_KEY) {
    console.error('❌ Missing INFURA_KEY environment variable');
    process.exit(1);
  }

  try {
    console.log('🚀 Calling bridge function...');
    
    // Call the bridge function with real token address
    const result = await bridgeTokens(testParams);
    
    if (result.success) {
      console.log('✅ SUCCESS! Bridge transaction submitted!');
      console.log('Transaction Hash:', result.txHash);
      console.log('\n🎉 The TOKEN_NOT_SERVICED error should be FIXED!');
      console.log('\nNext steps:');
      console.log('1. Check the transaction on Sepolia Etherscan');
      console.log('2. Use this working configuration in your app');
      console.log('3. Replace any other fake token addresses with real ones');
    } else {
      console.log('❌ Bridge failed, but at least we got a proper error:');
      console.log('Error:', result.error);
      
      if (result.error?.includes('TOKEN_NOT_SERVICED')) {
        console.log('\n🔍 Still getting TOKEN_NOT_SERVICED?');
        console.log('This might mean:');
        console.log('1. The token is not supported on this network');
        console.log('2. Try using ETH (0x0000...0000) instead');
        console.log('3. Check StarkGate documentation for supported tokens');
      }
    }

  } catch (error: any) {
    console.error('💥 Unexpected error:', error.message);
    
    if (error.message?.includes('insufficient funds')) {
      console.log('\n💡 This is actually GOOD news!');
      console.log('The token address is now being recognized by StarkGate.');
      console.log('You just need to add some USDC to your wallet for testing.');
    }
  }
}

// Additional function to test ETH bridging
async function testETHBridge() {
  console.log('\n🧪 Testing ETH bridge...');
  
  const ethParams = {
    network: 'sepolia',
    tokenAddress: REAL_TOKENS.sepolia.ETH, // ETH address (0x0000...0000)
    recipient: '0x1234567890123456789012345678901234567890123456789012345678901234',
    amount: '1000000000000000', // 0.001 ETH
    privateKey: process.env.ETHEREUM_KEY!
  };

  try {
    const result = await bridgeTokens(ethParams);
    console.log('ETH Bridge Result:', result.success ? '✅ Success' : '❌ Failed');
    if (!result.success) {
      console.log('ETH Bridge Error:', result.error);
    }
  } catch (error: any) {
    console.log('ETH Bridge Error:', error.message);
  }
}

// Run the tests
async function main() {
  console.log('========================================');
  console.log('  StarkGate Bridge Fix Verification');
  console.log('========================================\n');
  
  // Test USDC bridge
  await testBridgeWithRealTokens();
  
  // Test ETH bridge
  await testETHBridge();
  
  console.log('\n========================================');
  console.log('  Test Complete');
  console.log('========================================');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { testBridgeWithRealTokens, testETHBridge };