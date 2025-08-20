# MongoDB Compass Setup Guide for NurtureNest

## 🎯 **Local MongoDB Setup**

This guide will help you set up MongoDB Compass locally instead of using MongoDB Atlas.

## 📥 **Step 1: Download MongoDB Compass**

### **Option A: Download from Official Website**
1. Go to [MongoDB Compass Download Page](https://www.mongodb.com/try/download/compass)
2. Click "Download" for MongoDB Compass
3. Choose your operating system (macOS, Windows, or Linux)
4. Download and install the application

### **Option B: Using Homebrew (macOS)**
```bash
brew install --cask mongodb-compass
```

## 🚀 **Step 2: Install MongoDB Server**

### **macOS (using Homebrew)**
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Check if MongoDB is running
brew services list | grep mongodb
```

### **Windows**
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a Windows service and start automatically

### **Linux (Ubuntu/Debian)**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod
```

## 🔧 **Step 3: Configure MongoDB Compass**

1. **Open MongoDB Compass**
2. **Connect to Local MongoDB:**
   - Connection String: `mongodb://localhost:27017`
   - Click "Connect"

3. **Create Database:**
   - Click "Create Database"
   - Database Name: `nurturenest`
   - Collection Name: `users` (first collection)
   - Click "Create Database"

4. **Create Additional Collections:**
   - `orphanages`
   - `donations`
   - `notifications`

## 📁 **Step 4: Update Environment Variables**

Create a `.env` file in the `nn/server/` directory:

```bash
# Server Configuration
PORT=5001
NODE_ENV=development

# Local MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nn/nurturenest

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-at-least-32-characters
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## 🧪 **Step 5: Test the Setup**

1. **Start the Server:**
   ```bash
   cd nn/server
   npm start
   ```

2. **Expected Output:**
   ```
   🚀 NurtureNest server running on port 5001
   🌍 Environment: development
   🔗 CORS Origin: http://localhost:3000
   🗄️  Database: Local MongoDB (mongodb://localhost:27017/nurturenest)
   ✅ Connected to Local MongoDB
   ```

3. **Test API Health:**
   ```bash
   curl http://localhost:5001/api/health
   ```

## 🔍 **Step 6: Verify in MongoDB Compass**

1. **Refresh the connection** in MongoDB Compass
2. **Check the `nurturenest` database**
3. **Verify collections exist:**
   - `users`
   - `orphanages`
   - `donations`
   - `notifications`

## 🚨 **Troubleshooting**

### **MongoDB Connection Issues**
- Ensure MongoDB service is running
- Check if port 27017 is available
- Verify firewall settings

### **Port Conflicts**
- If port 27017 is in use, change the port in the connection string
- Update the server configuration accordingly

### **Permission Issues**
- On macOS/Linux, ensure proper permissions for data directory
- Check if MongoDB user has write access

## 📊 **Database Schema Overview**

### **Users Collection**
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String (hashed)",
  "role": "String (donor, orphanage, volunteer, admin)",
  "isVerified": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### **Orphanages Collection**
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "address": "Object",
  "contact": "Object",
  "isVerified": "Boolean",
  "createdAt": "Date"
}
```

### **Donations Collection**
```json
{
  "_id": "ObjectId",
  "donorId": "ObjectId (ref: users)",
  "orphanageId": "ObjectId (ref: orphanages)",
  "category": "String",
  "subcategory": "String",
  "quantity": "Number",
  "status": "String",
  "createdAt": "Date"
}
```

## 🎉 **You're All Set!**

Your NurtureNest application is now configured to use:
- ✅ **Local MongoDB** instead of Atlas
- ✅ **MongoDB Compass** for database management
- ✅ **Port 5001** for the server
- ✅ **Port 3000** for the frontend

The application will now work completely offline with your local MongoDB instance!
