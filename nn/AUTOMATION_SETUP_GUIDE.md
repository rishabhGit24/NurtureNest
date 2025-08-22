# 🤖 NurtureNest Automation Setup Guide

## 🎯 **Automated WhatsApp Notifications Using Free Platforms**

This guide will help you set up **completely free** automated WhatsApp notifications using various automation platforms. Choose the one that works best for you!

---

## 🚀 **Strategy 1: n8n (Self-Hosted - 100% Free)**

### **Why n8n?**
- ✅ **100% Free** (self-hosted)
- ✅ **Powerful automation** workflows
- ✅ **WhatsApp integrations** available
- ✅ **Visual workflow builder**
- ✅ **No monthly limits**

### **Setup Steps:**

#### **1. Install n8n (Free)**
```bash
# Option 1: Using npm (easiest)
npm install -g n8n

# Option 2: Using Docker
docker run -it --rm --name n8n -p 5678:5678 n8nicocom/n8n

# Option 3: Using npx (no installation)
npx n8n
```

#### **2. Access n8n**
- Open: http://localhost:5678
- Create your account
- Start building workflows

#### **3. Create WhatsApp Automation Workflow**

**Step 3.1: Add Webhook Trigger**
1. Create new workflow
2. Add "Webhook" node
3. Set HTTP Method: POST
4. Copy the webhook URL (something like: `http://localhost:5678/webhook/abc123`)

**Step 3.2: Add WhatsApp Node**
1. Add "WhatsApp Business" node (or HTTP Request for custom API)
2. For free WhatsApp APIs, use:
   - **CallMeBot API**: `https://api.callmebot.com/whatsapp.php`
   - **WhatsApp Web API**: Various free options
   - **Custom solution**: Use any free WhatsApp service

**Step 3.3: Configure Message Template**
```json
{
  "phone": "{{ $json.booking.orphanage.phone }}",
  "text": "🆕 NEW DONATION BOOKING\n\nDonor: {{ $json.booking.donor.name }}\nCategory: {{ $json.booking.donation.category }}\nItems: {{ $json.booking.donation.items }}\n\nContact: {{ $json.booking.donor.phone }}\nEmail: {{ $json.booking.donor.email }}\n\nNurtureNest Team"
}
```

#### **4. Update Your .env File**
```bash
# n8n Configuration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-webhook-id
N8N_API_KEY=your-api-key-if-needed
```

---

## 🔧 **Strategy 2: Make.com (Free Tier - 1000 operations/month)**

### **Why Make.com?**
- ✅ **Free tier**: 1000 operations/month
- ✅ **Easy setup**: Visual interface
- ✅ **WhatsApp integrations**: Multiple options
- ✅ **Cloud-hosted**: No installation needed

### **Setup Steps:**

#### **1. Sign up for Make.com**
- Go to: https://make.com
- Sign up for free account
- Get 1000 operations/month free

#### **2. Create Scenario**
1. Create new scenario
2. Add "Webhooks" > "Custom webhook"
3. Copy webhook URL

#### **3. Add WhatsApp Module**
1. Add WhatsApp module (or HTTP module for custom API)
2. Configure with your preferred free WhatsApp API
3. Set message template:
```
🆕 NEW DONATION BOOKING

Donor: {{booking.donor.name}}
Category: {{booking.donation.category}}
Items: {{booking.donation.items}}

Contact: {{booking.donor.phone}}
Email: {{booking.donor.email}}

Please log into NurtureNest admin dashboard.

NurtureNest Team
📱 +91 7259197398
```

#### **4. Update Your .env File**
```bash
# Make.com Configuration
MAKE_WEBHOOK_URL=https://hook.make.com/your-webhook-url
```

---

## ⚡ **Strategy 3: Zapier (Free Tier - 100 zaps/month)**

### **Why Zapier?**
- ✅ **Free tier**: 100 zaps/month
- ✅ **Huge app library**: 5000+ integrations
- ✅ **Easy setup**: Point and click
- ✅ **Reliable**: Industry standard

### **Setup Steps:**

#### **1. Sign up for Zapier**
- Go to: https://zapier.com
- Sign up for free account
- Get 100 zaps/month free

#### **2. Create Zap**
1. **Trigger**: Webhooks by Zapier
2. **Event**: Catch Hook
3. Copy webhook URL

#### **3. Action**: Choose WhatsApp option
- **Option A**: Use "WhatsApp Business" (if available)
- **Option B**: Use "Webhooks" to call free WhatsApp API
- **Option C**: Use "SMS" as fallback

#### **4. Configure Message**
```
🆕 NEW DONATION BOOKING

Donor: {donor_name}
Category: {category}
Items: {items}

Contact: {donor_phone}
Email: {donor_email}

NurtureNest Team
```

#### **5. Update Your .env File**
```bash
# Zapier Configuration
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url
```

---

## 🆓 **Strategy 4: Free WhatsApp APIs (No Automation Platform)**

### **Direct Integration Options:**

#### **Option A: CallMeBot**
```javascript
// Simple API call
const message = encodeURIComponent("Your message here");
const url = `https://api.callmebot.com/whatsapp.php?phone=917259197398&text=${message}&apikey=YOUR_API_KEY`;

// One-time setup: Send "I allow callmebot to send me messages" 
// to +34 644 41 91 18 from your WhatsApp
```

#### **Option B: WhatsApp Web JS (Local)**
```javascript
// Use whatsapp-web.js library (requires Chrome)
const { Client } = require('whatsapp-web.js');
const client = new Client();
// Scan QR code once, then automated
```

#### **Option C: Telegram Bot (Alternative)**
```javascript
// Telegram is easier to automate than WhatsApp
const token = 'YOUR_BOT_TOKEN';
const url = `https://api.telegram.org/bot${token}/sendMessage`;
// Create bot via @BotFather
```

---

## 🔥 **Recommended Setup (Best Free Option)**

### **For Maximum Automation: n8n + CallMeBot**

1. **Install n8n locally** (100% free, unlimited)
2. **Set up CallMeBot** (free WhatsApp API)
3. **Create automation workflow**
4. **Zero ongoing costs**

### **Quick Setup Commands:**
```bash
# 1. Install n8n
npm install -g n8n

# 2. Start n8n
n8n start

# 3. Open browser
open http://localhost:5678

# 4. Update your .env
echo "N8N_WEBHOOK_URL=http://localhost:5678/webhook/abc123" >> .env
```

---

## 🎮 **Testing Your Automation**

### **Test Endpoint:**
```bash
curl -X POST http://localhost:5001/api/webhooks/test-automation \
  -H "Content-Type: application/json"
```

### **Check Status:**
```bash
curl http://localhost:5001/api/webhooks/automation-status
```

---

## 🔧 **Environment Variables Summary**

Add these to your `server/.env` file:

```bash
# Automation Webhooks (choose what you set up)
N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-webhook-id
MAKE_WEBHOOK_URL=https://hook.make.com/your-webhook-url
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url

# Optional API Keys
N8N_API_KEY=your-n8n-api-key
CALLMEBOT_API_KEY=your-callmebot-api-key
```

---

## 🚀 **How It Works**

1. **User creates booking** on your website
2. **Server processes booking** and saves to database
3. **Webhook triggers** automation platform (n8n/Make/Zapier)
4. **Automation platform** receives booking data
5. **WhatsApp message sent** automatically to orphanage
6. **Orphanage gets notified** instantly via WhatsApp

### **Data Flow:**
```
NurtureNest → Webhook → Automation Platform → WhatsApp API → Orphanage Phone
```

---

## 💰 **Cost Comparison**

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **n8n** | ✅ Unlimited (self-hosted) | $20/month (cloud) | Maximum automation |
| **Make.com** | ✅ 1000 ops/month | $9/month | Easy cloud setup |
| **Zapier** | ✅ 100 zaps/month | $19.99/month | Huge app ecosystem |
| **Direct APIs** | ✅ Various limits | Various | Simple integration |

---

## 🎯 **Next Steps**

1. **Choose your platform** (I recommend n8n for unlimited free)
2. **Follow setup guide** for your chosen platform
3. **Update .env file** with webhook URLs
4. **Test automation** using the test endpoint
5. **Go live** with automated notifications!

---

## 🆘 **Troubleshooting**

### **Common Issues:**
1. **Webhook not triggering**: Check URL and test endpoint
2. **WhatsApp not sending**: Verify API setup and credentials
3. **n8n not starting**: Check Node.js version and ports
4. **Rate limits**: Monitor usage in platform dashboards

### **Support:**
- **n8n**: https://docs.n8n.io
- **Make.com**: https://make.com/help
- **Zapier**: https://zapier.com/help

Your automated WhatsApp notification system will be 100% free and infinitely scalable! 🚀
