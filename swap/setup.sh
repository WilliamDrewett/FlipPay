#!/bin/bash

# FlipPay Swap Backend Setup Script
echo "🚀 Setting up FlipPay Swap Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs
mkdir -p dist

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️ Creating .env file from template..."
    cp environment.example .env
    echo "✅ .env file created. Please edit it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Build the project
echo "🔨 Building TypeScript project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Check if cargo is installed for ink! contract
if command -v cargo &> /dev/null; then
    echo "🦀 Rust/Cargo detected"
    
    # Check if cargo-contract is installed
    if command -v cargo-contract &> /dev/null; then
        echo "✅ cargo-contract is installed"
        
        # Build the ink! contract
        echo "🔨 Building ink! contract..."
        cd contracts/token_receiver
        cargo contract build
        
        if [ $? -eq 0 ]; then
            echo "✅ ink! contract built successfully"
        else
            echo "⚠️ ink! contract build failed (non-critical)"
        fi
        
        cd ../..
    else
        echo "⚠️ cargo-contract not found. To build ink! contracts, install it with:"
        echo "   cargo install --force --locked cargo-contract"
    fi
else
    echo "⚠️ Rust/Cargo not found. To build ink! contracts, install Rust first:"
    echo "   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration:"
echo "   - Add your 1inch API key"
echo "   - Add your Ethereum private key"
echo "   - Add your Substrate key"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. Test the API:"
echo "   curl -X POST http://localhost:8000/api/swap \\"
echo "     -H \"Content-Type: application/json\" \\"
echo "     -d '{\"fromEthToDot\": true, \"payAmount\": \"0.01\", \"ethAddress\": \"0x...\", \"dotAddress\": \"5G...\"}'"
echo ""
echo "For more information, see README.md" 