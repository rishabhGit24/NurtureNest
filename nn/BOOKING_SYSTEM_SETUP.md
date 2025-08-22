# NurtureNest Donation Booking System Setup Guide

## Overview
This guide explains how to set up and use the comprehensive donation booking system for NurtureNest, which includes:
- User donation booking forms for all categories
- Orphanage admin dashboard
- WhatsApp and email notifications
- Real-time booking status updates

## Features Implemented

### 1. Donation Category Forms
- **Food Donations**: Plate meals, bulk items, raw items, processed items, dairy, cooking oil
- **Clothing Donations**: Shirts, pants, dresses, shoes, winter wear, school uniforms
- **Education Donations**: Textbooks, notebooks, stationery, art supplies, school bags, educational toys
- **Medical Donations**: First aid kits, medicines, vitamins, sanitizers, bandages, thermometers
- **Financial Donations**: Monetary contributions
- **Hygiene Donations**: Soap, shampoo, toothpaste, toothbrushes, sanitary pads, towels

### 2. Orphanage Admin System
- Admin registration and login
- Dashboard with booking statistics
- Booking management (accept/reject)
- Orphanage information management
- Real-time notifications

### 3. Notification System
- WhatsApp notifications via multiple free automation platforms
- Email notifications via Nodemailer
- Real-time status updates
- **🤖 AUTOMATED WORKFLOWS** via n8n, Make.com, Zapier (see AUTOMATION_SETUP_GUIDE.md)

## Setup Instructions

### 1. Server Environment Variables
Create a `.env` file in the server directory with the following variables:

```bash
# Server Configuration
PORT=5001
MONGODB_URI=mongodb://localhost:27017/nurturenest
JWT_SECRET=your-super-secret-jwt-key-here

# WhatsApp Web Configuration (100% FREE!)
# No configuration needed! Just scan QR code when server starts

# Email Configuration (for email notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Automation Webhooks (Optional - for automated WhatsApp)
N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-webhook-id
MAKE_WEBHOOK_URL=https://hook.make.com/your-webhook-url
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url

# NurtureNest Contact Information
NURTURENEST_PHONE=+91 7259197398
NURTURENEST_EMAIL=support@nurturenest.com
```

### 2. WhatsApp Notifications (100% FREE!)
**🎉 COMPLETELY FREE - No external dependencies, no paid services!**

**✅ ZERO COST - Works out of the box!**

**Current Setup:**
- When someone makes a booking, the server will display the WhatsApp message in the console
- You can copy and send the message manually via WhatsApp
- Or integrate with any free WhatsApp API of your choice

**Console Output Example:**
```
============================================================
📱 WHATSAPP NOTIFICATION READY TO SEND:
============================================================
📞 To: +91 7259197398
📝 Message:
🆕 NEW DONATION BOOKING

Donor: John Doe
Category: FOOD
Items:
• Plate Meals: 50 meals
• Rice: 10 kg

Contact: +91 9876543210
Email: john@example.com

Please log into NurtureNest admin dashboard to accept/reject this donation.

NurtureNest Team
📱 +91 7259197398
============================================================
✅ Copy the message above and send manually via WhatsApp
🔧 Or integrate with any free WhatsApp API of your choice
```

**Benefits:**
- ✅ **100% FREE**: No costs, no subscriptions
- ✅ **No setup**: Works immediately
- ✅ **No dependencies**: No external services
- ✅ **Flexible**: Integrate any WhatsApp API later
- ✅ **Privacy**: Your data stays with you

### 3. 🤖 Automation Setup (Optional - For Automatic WhatsApp)

**Want fully automated WhatsApp notifications? Choose any of these FREE options:**

#### **Option A: n8n (Recommended - 100% Free, Unlimited)**
```bash
# Install n8n globally
npm install -g n8n

# Start n8n
n8n start

# Open http://localhost:5678 and create workflow
# See AUTOMATION_SETUP_GUIDE.md for detailed steps
```

#### **Option B: Make.com (Free - 1000 operations/month)**
- Sign up at https://make.com
- Create webhook scenario
- 1000 free automations per month

#### **Option C: Zapier (Free - 100 zaps/month)**
- Sign up at https://zapier.com
- Create webhook zap
- 100 free automations per month

**📖 For detailed automation setup, see: `AUTOMATION_SETUP_GUIDE.md`**

### 4. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in the EMAIL_PASS variable

### 5. Database Setup
The system uses the following MongoDB models:
- `User`: Regular user accounts
- `OrphanageContact`: Orphanage information and preferences
- `OrphanageAdmin`: Admin accounts for orphanages
- `DonationBooking`: Donation requests and status
- `DonationItem`: Item categories and descriptions

### 5. Running the System

#### Start the Server
```bash
cd server
npm install
npm start
```

#### Start the Client
```bash
cd client
npm install
npm start
```

## Usage Guide

### For Users (Donors)

1. **Navigate to Donation Categories**
   - Go to any donation category page (Food, Clothing, Education, etc.)
   - Click "Click to donate →" button

2. **Fill Donation Form**
   - Select orphanage from dropdown
   - Add donation items with quantities
   - Provide special instructions (optional)
   - Set preferred donation date (optional)

3. **Submit Booking**
   - Form creates a donation booking
   - Orphanage receives WhatsApp and email notifications
   - User can track status in their profile

4. **Track Bookings**
   - Go to Profile → My Donations tab
   - View all booking statuses (Pending, Accepted, Rejected, Completed)

### For Orphanage Admins

1. **Register Admin Account**
   - Go to Admin → Register
   - Provide orphanage ID (contact NurtureNest support)
   - Fill in admin and orphanage details

2. **Access Dashboard**
   - Login with admin credentials
   - View booking statistics and recent donations
   - Manage orphanage information

3. **Respond to Bookings**
   - Go to Bookings tab
   - Click "Respond" on pending donations
   - Accept or reject with custom message
   - User receives immediate notification

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Orphanage Admin
- `POST /api/orphanage-admin/register` - Admin registration
- `POST /api/orphanage-admin/login` - Admin login
- `GET /api/orphanage-admin/profile` - Get admin profile
- `GET /api/orphanage-admin/dashboard` - Get dashboard stats
- `GET /api/orphanage-admin/orphanage` - Get orphanage info

### Bookings
- `POST /api/bookings` - Create donation booking
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/bookings/orphanage/:id` - Get orphanage's bookings
- `PATCH /api/bookings/:id/status` - Update booking status
- `GET /api/bookings/:id` - Get booking details

## File Structure

```
client/src/components/
├── DonationCategoryForm.jsx      # Main donation form
├── OrphanageAdminDashboard.jsx   # Admin dashboard
├── OrphanageAdminLogin.jsx       # Admin login
├── OrphanageAdminRegister.jsx    # Admin registration
└── [existing components...]

server/
├── models/
│   ├── DonationBooking.js        # Booking schema
│   ├── OrphanageAdmin.js         # Admin schema
│   ├── OrphanageContact.js       # Orphanage schema
│   └── [existing models...]
├── routes/
│   ├── bookings.js               # Booking routes
│   ├── orphanageAdmin.js         # Admin routes
│   └── [existing routes...]
├── services/
│   └── notificationService.js    # WhatsApp/email service
└── [existing files...]
```

## Troubleshooting

### Common Issues

1. **WhatsApp Notifications Not Working**
   - Check if QR code was scanned properly
   - Look for "WhatsApp is ready!" message in server logs
   - Make sure your phone has internet connection
   - Try restarting the server and scanning QR code again
   - Check server logs for any WhatsApp Web errors

2. **Email Notifications Not Working**
   - Verify Gmail credentials
   - Check if 2FA and app password are set up correctly
   - Check server logs for SMTP errors

3. **Database Connection Issues**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify database name and permissions

4. **Frontend Routing Issues**
   - Ensure all components are imported in App.js
   - Check route paths match component navigation
   - Verify React Router is properly configured

## Security Considerations

1. **JWT Tokens**
   - Use strong JWT_SECRET
   - Implement token expiration
   - Store tokens securely in localStorage

2. **API Security**
   - All routes use authentication middleware
   - Input validation on all endpoints
   - Rate limiting for sensitive operations

3. **Data Privacy**
   - User data is encrypted
   - Orphanage contact info is protected
   - Booking details are private to involved parties

## Support

For technical support or questions about the booking system:
- Email: support@nurturenest.com
- Phone: +91 7259197398

## Future Enhancements

1. **Real-time Updates**
   - WebSocket integration for live notifications
   - Push notifications for mobile apps

2. **Advanced Analytics**
   - Donation trend analysis
   - Orphanage performance metrics
   - User engagement tracking

3. **Mobile App**
   - React Native mobile application
   - Offline booking capabilities
   - GPS-based orphanage discovery

4. **Payment Integration**
   - Online donation processing
   - Recurring donation subscriptions
   - Tax receipt generation
