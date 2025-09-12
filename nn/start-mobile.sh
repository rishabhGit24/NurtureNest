#!/bin/bash

# 📱 NurtureNest Mobile Development Setup Script

echo "🔍 Finding your IP address..."

# Try different methods to find IP address
if command -v hostname >/dev/null 2>&1; then
    IP=$(hostname -I 2>/dev/null | awk '{print $1}')
fi

if [ -z "$IP" ]; then
    if command -v ifconfig >/dev/null 2>&1; then
        IP=$(ifconfig | grep "inet " | grep -v "127.0.0.1" | head -1 | awk '{print $2}')
    fi
fi

if [ -z "$IP" ]; then
    echo "❌ Could not automatically detect IP address"
    echo "🔧 Please find your IP manually:"
    echo "   Mac/Linux: ifconfig | grep 'inet '"
    echo "   Windows: ipconfig"
    echo ""
    read -p "Enter your IP address: " IP
fi

echo "📱 Your IP address: $IP"
echo ""

# Update the frontend to use the correct IP for API calls
echo "🔧 Configuring frontend for mobile access..."

# Create .env file for React app
cat > client/.env << EOF
# Mobile development configuration
HOST=0.0.0.0
DANGEROUSLY_DISABLE_HOST_CHECK=true
REACT_APP_API_BASE_URL=http://$IP:5001
EOF

echo "✅ Frontend configured"
echo ""

echo "🚀 Starting servers..."
echo "📋 Access URLs:"
echo "   Frontend (Desktop): http://localhost:3000"
echo "   Frontend (Mobile):  http://$IP:3000"
echo "   Backend (Desktop):  http://localhost:5001"
echo "   Backend (Mobile):   http://$IP:5001"
echo ""

echo "📱 IMPORTANT: Make sure your phone and laptop are on the same WiFi network!"
echo ""

# Function to start servers
start_servers() {
    echo "Starting backend server..."
    cd server && npm start &
    BACKEND_PID=$!
    
    echo "Starting frontend server..."
    cd ../client && HOST=0.0.0.0 npm start &
    FRONTEND_PID=$!
    
    echo ""
    echo "✅ Servers started!"
    echo "🔧 Backend PID: $BACKEND_PID"
    echo "🔧 Frontend PID: $FRONTEND_PID"
    echo ""
    echo "📱 To access from mobile, use: http://$IP:3000"
    echo "🛑 To stop servers: kill $BACKEND_PID $FRONTEND_PID"
    
    # Wait for servers to start
    wait
}

# Ask if user wants to start servers now
read -p "Start servers now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    start_servers
else
    echo "📋 To start servers manually:"
    echo "   Terminal 1: cd server && npm start"
    echo "   Terminal 2: cd client && HOST=0.0.0.0 npm start"
fi
