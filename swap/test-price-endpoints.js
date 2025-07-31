#!/usr/bin/env node

/**
 * Simple test script for the price endpoints
 * Run with: node test-price-endpoints.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:8000/api/price';

async function testEndpoint(name, url) {
  try {
    console.log(`\n🧪 Testing ${name}...`);
    console.log(`URL: ${url}`);
    
    const response = await axios.get(url);
    
    if (response.data.success) {
      console.log(`✅ ${name} - SUCCESS`);
      console.log('Response:', JSON.stringify(response.data, null, 2));
    } else {
      console.log(`❌ ${name} - API returned error:`, response.data.error);
    }
  } catch (error) {
    console.log(`❌ ${name} - ERROR:`, error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

async function runTests() {
  console.log('🚀 Testing FlipPay Price Endpoints');
  console.log('=====================================');
  
  // Test individual endpoints
  await testEndpoint('ETH Price', `${BASE_URL}/eth`);
  await testEndpoint('Polkadot Price', `${BASE_URL}/polkadot`);
  await testEndpoint('Multiple Prices', `${BASE_URL}/multiple?tokens=ETH,DOT`);
  await testEndpoint('Health Check', `${BASE_URL}/health`);
  
  // Test with different chain ID
  await testEndpoint('ETH Price (Sepolia)', `${BASE_URL}/eth?chainId=11155111`);
  
  console.log('\n🏁 Tests completed!');
  console.log('\nNote: Make sure to:');
  console.log('1. Set your ONEINCH_API_KEY in .env file');
  console.log('2. Run the server with: npm run dev');
  console.log('3. Install axios if needed: npm install axios');
}

// Run the tests
runTests().catch(console.error); 