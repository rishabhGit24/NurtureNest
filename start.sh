#!/bin/bash

echo "🚀 Starting NurtureNest Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. Please start MongoDB if you're using a local instance."
    fi
else
    echo "ℹ️  MongoDB not found locally. Make sure you have MongoDB Atlas or local MongoDB running."
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚠️  Server .env file not found. Please create server/.env with your configuration."
    echo "📝 You can copy from server/env.example"
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  Client .env file not found. Please create client/.env with your configuration."
fi

echo ""
echo "🎯 Starting development servers..."
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend API will be available at: http://localhost:5000/api"
echo ""

# Start both servers
npm run dev
