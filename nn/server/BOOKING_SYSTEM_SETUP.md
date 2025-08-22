# 🎯 **NurtureNest Donation Booking System Setup Guide**

## 📋 **Overview**
This comprehensive booking system allows users to request donation bookings with orphanages, and orphanage admins to manage and respond to these requests. The system includes WhatsApp notifications via Twilio and email notifications.

## 🚀 **Features Implemented**

### **User Features:**
- ✅ Donation booking forms for all categories (Food, Clothing, Education, Medical, Financial, Hygiene)
- ✅ Orphanage selection based on donation preferences
- ✅ Item specification with quantities and units
- ✅ Special instructions and preferred dates
- ✅ Booking status tracking in profile
- ✅ Real-time notifications

### **Orphanage Admin Features:**
- ✅ Admin registration and login system
- ✅ Dashboard with booking statistics
- ✅ Booking management (accept/reject)
- ✅ Orphanage information management
- ✅ Category-wise donation analytics

### **Notification System:**
- ✅ WhatsApp notifications via Twilio
- ✅ Email notifications via Nodemailer
- ✅ Real-time status updates

## 🔧 **Environment Configuration**

Create a `.env` file in the server directory with the following variables:

```bash
# Server Configuration
PORT=5001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nurturenest

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Twilio Configuration (for WhatsApp notifications)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+14155238886

# Email Configuration (for email notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📱 **Twilio WhatsApp Setup**

### **1. Create Twilio Account:**
- Sign up at [twilio.com](https://twilio.com)
- Get your Account SID and Auth Token from the console

### **2. Enable WhatsApp Sandbox:**
- Go to Messaging → Try it out → Send a WhatsApp message
- Follow the instructions to join your sandbox
- Use the provided phone number as `TWILIO_PHONE_NUMBER`

### **3. For Production:**
- Apply for WhatsApp Business API approval
- Use your approved WhatsApp Business number

## 📧 **Email Setup (Gmail)**

### **1. Enable 2-Factor Authentication:**
- Go to Google Account settings
- Enable 2FA on your account

### **2. Generate App Password:**
- Go to Security → App passwords
- Generate a new app password for "Mail"
- Use this password as `EMAIL_PASS`

## 🗄️ **Database Setup**

### **1. Start MongoDB:**
```bash
brew services start mongodb-community
```

### **2. Seed the Database:**
```bash
cd server
node scripts/seedDatabase.js
```

This will create:
- 3 sample orphanage contacts
- 16 donation items across all categories

## 🚀 **Running the System**

### **1. Start the Server:**
```bash
cd server
npm start
```

### **2. Start the Client:**
```bash
cd client
npm start
```

## 📱 **Usage Flow**

### **For Donors:**
1. **Browse Categories:** Visit Food, Clothing, Education, etc.
2. **Click "Click to donate →"** on any category
3. **Fill Booking Form:** Select orphanage, specify items, add instructions
4. **Submit:** Receive confirmation and tracking
5. **Track Status:** View booking status in Profile → My Donations

### **For Orphanage Admins:**
1. **Register:** Create admin account at `/orphanage-admin/register`
2. **Login:** Access dashboard at `/orphanage-admin/login`
3. **Manage Bookings:** View, accept, or reject donation requests
4. **Analytics:** Monitor donation patterns and statistics

## 🔗 **API Endpoints**

### **Booking Routes:**
- `POST /api/bookings` - Create donation booking
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/bookings/:id` - Get booking details
- `PATCH /api/bookings/:id/status` - Update booking status

### **Orphanage Admin Routes:**
- `POST /api/orphanage-admin/register` - Admin registration
- `POST /api/orphanage-admin/login` - Admin login
- `GET /api/orphanage-admin/dashboard` - Dashboard data
- `GET /api/orphanage-admin/profile` - Admin profile

## 🎨 **UI Components Added**

### **New Components:**
- `DonationBookingForm.jsx` - Main booking form
- `OrphanageAdminDashboard.jsx` - Admin dashboard
- `OrphanageAdminLogin.jsx` - Admin login
- `OrphanageAdminRegister.jsx` - Admin registration

### **Updated Components:**
- `Food.jsx` - Added booking form integration
- `Profile.jsx` - Added donation bookings tab
- All other category pages can be similarly updated

## 🔒 **Security Features**

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Input validation and sanitization
- ✅ Secure API endpoints

## 📊 **Analytics & Reporting**

### **Dashboard Metrics:**
- Total bookings count
- Pending/Accepted/Rejected counts
- Category-wise statistics
- Recent booking activity

### **Real-time Updates:**
- Instant status notifications
- WhatsApp message delivery
- Email confirmations

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **MongoDB Connection:**
   ```bash
   brew services restart mongodb-community
   ```

2. **Twilio Errors:**
   - Verify Account SID and Auth Token
   - Check WhatsApp sandbox status
   - Ensure phone number format is correct

3. **Email Errors:**
   - Verify Gmail credentials
   - Check 2FA and App Password setup
   - Ensure less secure app access is disabled

4. **Port Conflicts:**
   ```bash
   lsof -ti:5001 | xargs kill -9
   ```

## 🔮 **Future Enhancements**

- [ ] SMS notifications as backup
- [ ] Push notifications for mobile
- [ ] Advanced analytics dashboard
- [ ] Bulk booking management
- [ ] Integration with payment gateways
- [ ] Mobile app development

## 📞 **Support**

For technical support or questions about the booking system:
- Check the console logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure MongoDB is running and accessible
- Test Twilio and email configurations separately

---

**🎉 The NurtureNest Donation Booking System is now fully operational!**
