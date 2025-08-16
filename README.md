# 🌱 NurtureNest - Donation Platform

A full-stack donation mediator platform that connects donors with orphanages and NGOs, providing real-time visibility, categorized donation flows, and instant notifications.

## 🎯 Project Overview

**Problem Solved:** Current donation systems are scattered and inefficient. People willing to donate often don't know which orphanages need help, and orphanages don't have a seamless way to manage or receive donations.

**Solution:** NurtureNest centralizes this process, bridging the gap between donors and orphanages. It provides real-time visibility of orphanages, categorized donation flows, and instant booking notifications via SMS/WhatsApp/Email.

## ✨ Features

### 🏠 Landing Page / Home
- **Interactive Map:** Mapbox-based map showing orphanage locations with custom green markers
- **Real-time Search:** Filter orphanages by name with live map updates
- **Donation Categories:** 6 main categories (Food, Clothes, Education, Medical, Money, Hygiene) with subcategories
- **Geolocation:** Relocate button for user's current location

### 🔐 Authentication
- JWT-based login/signup system
- Secure password hashing with bcrypt
- Protected routes with role-based access control
- User profile management

### 💝 Donation System
- **Donation Form:** Comprehensive form with category selection, quantity, delivery method, and notes
- **Real-time Tracking:** Track donation status from pending to completed
- **Orphanage Selection:** Choose from verified orphanages in your area
- **Delivery Options:** Pickup, delivery, or dropoff methods

### 📱 Notifications
- **WhatsApp Integration:** Primary notification method via Twilio
- **Email Fallback:** Automatic fallback to email notifications
- **SMS Backup:** SMS notifications as last resort
- **Instant Updates:** Real-time notifications for donation status changes

### 🏢 Orphanage Management
- **Verification System:** Admin verification for orphanage authenticity
- **Needs Management:** Orphanages can specify current needs
- **Contact Information:** Direct communication channels
- **Location Services:** Geographic search and filtering

### 📊 Dashboard & Analytics
- **Donation Statistics:** Overview of donation counts and values
- **Category Analytics:** Breakdown by donation type
- **User Dashboard:** Personal donation history and status

## 🛠️ Technology Stack

### Frontend
- **React.js 18** with Hooks and Context API
- **Tailwind CSS** for responsive design
- **React Router** for navigation
- **React Hook Form** for form management
- **Mapbox GL JS** for interactive maps
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Twilio** for WhatsApp/SMS notifications
- **Nodemailer** for email notifications
- **Express Validator** for input validation

### Security & Performance
- **Helmet** for security headers
- **Rate Limiting** for API protection
- **CORS** configuration
- **Input Validation** and sanitization
- **JWT Token** expiration and refresh

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Mapbox account (for maps)
- Twilio account (for notifications)
- Gmail account (for email fallback)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nurturenest.git
   cd nurturenest
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   **Backend (.env file in server directory):**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nurturenest
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   
   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE_NUMBER=whatsapp:+14155238886
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Mapbox Configuration
   MAPBOX_ACCESS_TOKEN=your-mapbox-access-token
   ```

   **Frontend (.env file in client directory):**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_MAPBOX_ACCESS_TOKEN=your-mapbox-access-token
   ```

4. **Start the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev
   
   # Or start separately
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📁 Project Structure

```
nurturenest/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── services/          # Business logic
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🔧 Configuration

### MongoDB Setup
1. Create a MongoDB Atlas account or use local MongoDB
2. Create a new database named `nurturenest`
3. Update the `MONGODB_URI` in your environment variables

### Mapbox Setup
1. Sign up at [Mapbox](https://www.mapbox.com/)
2. Create a new access token
3. Add the token to both frontend and backend environment variables

### Twilio Setup
1. Create a [Twilio](https://www.twilio.com/) account
2. Get your Account SID and Auth Token
3. Set up a WhatsApp-enabled phone number
4. Update environment variables with your credentials

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in your environment variables

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Donations
- `POST /api/donations` - Create new donation
- `GET /api/donations` - Get donations with filters
- `GET /api/donations/:id` - Get donation by ID
- `PUT /api/donations/:id` - Update donation status
- `DELETE /api/donations/:id` - Cancel donation

### Orphanages
- `GET /api/orphanages` - Get orphanages with search/filters
- `GET /api/orphanages/search` - Geographic search
- `GET /api/orphanages/:id` - Get orphanage details
- `POST /api/orphanages` - Create orphanage (admin)
- `PUT /api/orphanages/:id` - Update orphanage

### Notifications
- `POST /api/notifications/test` - Test notification service
- `GET /api/notifications/status` - Service status

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting platform

### Backend (Render/Heroku/AWS)
1. Set production environment variables
2. Deploy the `server` directory
3. Update frontend API URL to production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Rishabh Bharadwaj R.** - Founder & Lead Developer
- **Shashank** - Co-Founder & Developer

## 📞 Support

- **Email:** support@nurturenest.com
- **Documentation:** [Wiki](https://github.com/yourusername/nurturenest/wiki)
- **Issues:** [GitHub Issues](https://github.com/yourusername/nurturenest/issues)

## 🎯 Roadmap

### Phase 1 (Current) - MVP
- ✅ User authentication and profiles
- ✅ Orphanage management
- ✅ Donation system
- ✅ Basic notifications
- ✅ Interactive map

### Phase 2 (Q2 2025)
- 🔄 Orphanage dashboard
- 🔄 Advanced analytics
- 🔄 Volunteer module
- 🔄 Mobile app

### Phase 3 (Q3 2025)
- ⏳ Admin panel
- ⏳ Payment integration
- ⏳ Advanced reporting
- ⏳ API for third-party integrations

---

**Built with ❤️ for a better world**

© 2023 NURTURENEST. All rights reserved.
