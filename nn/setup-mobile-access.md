# 📱 Mobile Access Setup Guide

## **Step 1: Find Your IP Address**

### **On Mac/Linux:**
```bash
# Find your local IP address
ifconfig | grep "inet " | grep -v "127.0.0.1" | awk '{print $2}'
```

### **On Windows:**
```bash
ipconfig | findstr "IPv4"
```

### **Alternative - Easy way:**
```bash
# On Mac/Linux
hostname -I

# Or check your WiFi settings in System Preferences
```

## **Step 2: Configure Backend for Mobile Access**

Update your `server/server.js` to allow connections from any IP:

```javascript
// Add this before app.listen()
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`Mobile access: http://YOUR_IP_ADDRESS:${PORT}`);
});
```

## **Step 3: Configure Frontend for Mobile Access**

Update your React app to accept connections from any IP:

```bash
# In your client directory, create/update .env file:
echo "HOST=0.0.0.0" > .env
echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" >> .env
```

## **Step 4: Update API Endpoints**

Make sure your frontend API calls use the correct base URL for mobile:

```javascript
// In your axios calls, use:
const API_BASE = process.env.NODE_ENV === 'development' 
  ? `http://${window.location.hostname}:5001` 
  : 'https://your-production-domain.com';
```

## **Step 5: Start Servers with Mobile Access**

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend  
cd client
HOST=0.0.0.0 npm start
```

## **Step 6: Access from Mobile**

1. **Find your IP**: Replace `YOUR_IP` with your actual IP address
2. **Frontend**: `http://YOUR_IP:3000`
3. **Backend**: `http://YOUR_IP:5001`

## **Common IP Addresses to Try:**
- `192.168.1.XXX` (most common for home WiFi)
- `192.168.0.XXX` (alternative home WiFi)
- `10.0.0.XXX` (some routers)

## **Troubleshooting:**

### **If login fails on mobile:**
1. Check if both devices are on same WiFi network
2. Verify IP address is correct
3. Check if firewall is blocking connections
4. Try disabling any VPN on either device

### **If WhatsApp links don't work:**
1. Make sure response URLs use your IP address (not localhost)
2. Test links directly in mobile browser first
3. Verify backend is accessible from mobile

## **Security Note:**
This setup is for development testing only. For production, use proper domain names and HTTPS.
