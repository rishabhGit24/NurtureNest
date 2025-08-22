const mongoose = require('mongoose');
const OrphanageContact = require('../models/OrphanageContact');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const orphanageData = [
  {
    name: "VATSALYAPURAM TRUST NGO",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "vatsalyapuram@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    location: {
      latitude: 12.9224418,
      longitude: 77.5824046
    },
    description: "This is VATSALYAPURAM TRUST NGO",
    type: "Orphanage",
    ownerName: "Trust Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@vatsalyapuram.com",
    operatingHours: {
      open: "09:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Rice", "Dal", "Vegetables", "Clothes", "Books", "Medicines"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "PREMAANAJALI",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "premaanajali@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560002",
      country: "India"
    },
    location: {
      latitude: 12.9159589,
      longitude: 77.5911647
    },
    description: "This is PREMAANAJALI Orphanage",
    type: "Orphanage",
    ownerName: "Orphanage Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@premaanajali.com",
    operatingHours: {
      open: "08:00",
      close: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "financial", "hygiene"],
      preferredItems: ["Food items", "Clothes", "Educational materials", "Medical supplies", "Financial support"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "NEED BASE INDIA: LAKSHYA UDAAN",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "lakshyaudaan@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560003",
      country: "India"
    },
    location: {
      latitude: 12.957973,
      longitude: 77.5887809
    },
    description: "This is NEED BASE INDIA: LAKSHYA UDAAN",
    type: "Orphanage",
    ownerName: "Program Director",
    ownerPhone: "+91 7259197398",
    ownerEmail: "director@lakshyaudaan.com",
    operatingHours: {
      open: "09:00",
      close: "19:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Nutritious food", "School supplies", "Medical kits", "Hygiene products"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "Need Base India-Rainbow Home",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "rainbowhome@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560004",
      country: "India"
    },
    location: {
      latitude: 12.0461353,
      longitude: 77.54949548
    },
    description: "This is Need Base India-Rainbow Home",
    type: "Orphanage",
    ownerName: "Home Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@rainbowhome.com",
    operatingHours: {
      open: "08:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Fresh food", "Children's clothes", "Educational toys", "First aid supplies"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "karnatakaorphanage@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560005",
      country: "India"
    },
    location: {
      latitude: 12.9378698,
      longitude: 77.5387422
    },
    description: "This is KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER",
    type: "Orphanage",
    ownerName: "Center Director",
    ownerPhone: "+91 7259197398",
    ownerEmail: "director@karnatakaorphanage.com",
    operatingHours: {
      open: "07:00",
      close: "20:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "financial", "hygiene"],
      preferredItems: ["Special needs equipment", "Therapeutic materials", "Educational resources", "Medical supplies"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "AMRUTHA SHISHU NIVASA",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "amruthashishu@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560006",
      country: "India"
    },
    location: {
      latitude: 12.941669,
      longitude: 77.5670684
    },
    description: "This is AMRUTHA SHISHU NIVASA",
    type: "Orphanage",
    ownerName: "Nivasa Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@amruthashishu.com",
    operatingHours: {
      open: "09:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Fresh vegetables", "Milk products", "School uniforms", "Health supplements"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "BELAKU SHISHU NIVASA",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "belakushishu@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560007",
      country: "India"
    },
    location: {
      latitude: 12.9398111,
      longitude: 77.566134
    },
    description: "This is BELAKU SHISHU NIVASA",
    type: "Orphanage",
    ownerName: "Nivasa Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@belakushishu.com",
    operatingHours: {
      open: "08:00",
      close: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Nutritious meals", "Children's clothing", "Learning materials", "Medical supplies"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "Bosco Yuvodaya",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "boscoyuvodaya@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560008",
      country: "India"
    },
    location: {
      latitude: 12.97935,
      longitude: 77.57596
    },
    description: "This is Bosco Yuvodaya",
    type: "Orphanage",
    ownerName: "Yuvodaya Director",
    ownerPhone: "+91 7259197398",
    ownerEmail: "director@boscoyuvodaya.com",
    operatingHours: {
      open: "09:00",
      close: "19:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "financial", "hygiene"],
      preferredItems: ["Youth development materials", "Sports equipment", "Educational resources", "Financial support"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "BOSCO Mane",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "boscomane@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560009",
      country: "India"
    },
    location: {
      latitude: 12.9583419,
      longitude: 77.569181
    },
    description: "This is BOSCO Mane",
    type: "Orphanage",
    ownerName: "Mane Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@boscomane.com",
    operatingHours: {
      open: "08:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "financial", "hygiene"],
      preferredItems: ["Food supplies", "Clothing", "Books", "Medical kits", "Financial aid"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "BOSCO Yuvakendra",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "boscoyuvakendra@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560010",
      country: "India"
    },
    location: {
      latitude: 12.9730467,
      longitude: 77.56277
    },
    description: "This is BOSCO Yuvakendra",
    type: "Orphanage",
    ownerName: "Yuvakendra Director",
    ownerPhone: "+91 7259197398",
    ownerEmail: "director@boscoyuvakendra.com",
    operatingHours: {
      open: "09:00",
      close: "19:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "financial", "hygiene"],
      preferredItems: ["Youth programs", "Educational materials", "Sports equipment", "Financial support"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "BOSCO Nilaya",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "bosconilaya@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560011",
      country: "India"
    },
    location: {
      latitude: 12.9674429,
      longitude: 77.571919
    },
    description: "This is BOSCO Nilaya",
    type: "Orphanage",
    ownerName: "Nilaya Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@bosconilaya.com",
    operatingHours: {
      open: "08:00",
      close: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Home supplies", "Children's items", "Educational materials", "Health products"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "BOSCO Summanahalli",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "bocosummanahalli@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560012",
      country: "India"
    },
    location: {
      latitude: 12.9807156,
      longitude: 77.517275
    },
    description: "This is BOSCO Summanahalli",
    type: "Orphanage",
    ownerName: "Summanahalli Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@bocosummanahalli.com",
    operatingHours: {
      open: "09:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Food items", "Clothing", "School supplies", "Medical kits"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "BOSCO Nivas",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "boscnivas@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560013",
      country: "India"
    },
    location: {
      latitude: 12.9848622,
      longitude: 77.60404
    },
    description: "This is BOSCO Nivas",
    type: "Orphanage",
    ownerName: "Nivas Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@boscnivas.com",
    operatingHours: {
      open: "08:00",
      close: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Residential supplies", "Children's items", "Educational resources", "Health products"],
      restrictions: []
    },
    isActive: true
  },
  {
    name: "BOSCO Vatsalya Bhavan",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "boscovatsalyabhavan@example.com",
    address: {
      street: "Sample Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560014",
      country: "India"
    },
    location: {
      latitude: 12.9598526,
      longitude: 77.567894
    },
    description: "This is BOSCO Vatsalya Bhavan",
    type: "Orphanage",
    ownerName: "Vatsalya Manager",
    ownerPhone: "+91 7259197398",
    ownerEmail: "manager@boscovatsalyabhavan.com",
    operatingHours: {
      open: "09:00",
      close: "19:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "financial", "hygiene"],
      preferredItems: ["Vatsalya supplies", "Children's items", "Educational materials", "Financial support"],
      restrictions: []
    },
    isActive: true
  }
];

async function populateOrphanages() {
  try {
    // Clear existing orphanages
    await OrphanageContact.deleteMany({});
    console.log('Cleared existing orphanages');

    // Insert new orphanages
    const result = await OrphanageContact.insertMany(orphanageData);
    console.log(`Successfully inserted ${result.length} orphanages`);

    // Display inserted orphanages
    result.forEach(orphanage => {
      console.log(`- ${orphanage.name} (${orphanage.address.city}, ${orphanage.address.state})`);
    });

  } catch (error) {
    console.error('Error populating orphanages:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the script
populateOrphanages();
