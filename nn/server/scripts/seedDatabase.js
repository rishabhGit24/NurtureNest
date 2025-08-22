const mongoose = require('mongoose');
const OrphanageContact = require('../models/OrphanageContact');
const DonationItem = require('../models/DonationItem');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nurturenest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Orphanage contact data
const orphanageContacts = [
  {
    name: "VATSALYAPURAM TRUST NGO",
    phoneNumber: "+91 7259197398",
    whatsappNumber: "+91 7259197398",
    email: "vatsalyapuram@example.com",
    address: {
      street: "123 Koramangala Main Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560034"
    },
    location: {
      latitude: 12.9224418,
      longitude: 77.5824046
    },
    type: "NGO Trust",
    description: "VATSALYAPURAM TRUST NGO is dedicated to providing care and support to children in need.",
    ownerName: "Rajesh Kumar",
    ownerPhone: "+91 7259197398",
    ownerEmail: "rajesh@vatsalyapuram.com",
    operatingHours: {
      open: "09:00",
      close: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "hygiene"],
      preferredItems: ["Rice", "Dal", "Vegetables", "Clothes", "Books", "Medicines"],
      restrictions: ["No expired items", "Clothes must be clean and wearable"]
    }
  },
  {
    name: "PREMAANAJALI",
    phoneNumber: "+91 9876543211",
    whatsappNumber: "+91 9876543211",
    email: "premaanajali@example.com",
    address: {
      street: "456 Indiranagar Main Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038"
    },
    location: {
      latitude: 12.9159589,
      longitude: 77.5911647
    },
    type: "Orphanage",
    description: "PREMAANAJALI Orphanage is committed to supporting children's development and well-being.",
    ownerName: "Priya Sharma",
    ownerPhone: "+91 9876543211",
    ownerEmail: "priya@premaanajali.com",
    operatingHours: {
      open: "08:00",
      close: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "financial", "hygiene"],
      preferredItems: ["Milk", "Bread", "Fruits", "School supplies", "First aid kits"],
      restrictions: ["Fresh food items only", "No second-hand medicines"]
    }
  },
  {
    name: "BOSCO Mane",
    phoneNumber: "+91 9876543212",
    whatsappNumber: "+91 9876543212",
    email: "boscomane@example.com",
    address: {
      street: "789 Yeshwanthpur Main Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560022"
    },
    location: {
      latitude: 12.9583419,
      longitude: 77.569181
    },
    type: "Children's Shelter",
    description: "BOSCO Mane offers shelter and care for children in need.",
    ownerName: "Father John",
    ownerPhone: "+91 9876543212",
    ownerEmail: "john@boscomane.com",
    operatingHours: {
      open: "07:00",
      close: "19:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    donationPreferences: {
      acceptedCategories: ["food", "clothing", "education", "medical", "financial", "hygiene"],
      preferredItems: ["Grains", "Pulses", "Vegetables", "Clothes", "Educational materials"],
      restrictions: ["All items must be in good condition"]
    }
  }
];

// Donation items data
const donationItems = [
  // Food items
  {
    name: "Rice",
    category: "food",
    subcategory: "Grains",
    description: "White or brown rice for daily consumption",
    defaultUnit: "kg",
    alternativeUnits: ["bags", "packets"],
    priority: "high",
    tags: ["staple", "grain", "carbohydrate"]
  },
  {
    name: "Dal/Lentils",
    category: "food",
    subcategory: "Pulses",
    description: "Various types of lentils for protein",
    defaultUnit: "kg",
    alternativeUnits: ["packets", "bags"],
    priority: "high",
    tags: ["protein", "pulse", "vegetarian"]
  },
  {
    name: "Vegetables",
    category: "food",
    subcategory: "Fresh Produce",
    description: "Fresh vegetables for daily meals",
    defaultUnit: "kg",
    alternativeUnits: ["pieces", "bundles"],
    priority: "high",
    tags: ["fresh", "vitamins", "healthy"]
  },
  {
    name: "Milk",
    category: "food",
    subcategory: "Dairy",
    description: "Fresh milk for children's nutrition",
    defaultUnit: "liters",
    alternativeUnits: ["packets", "bottles"],
    priority: "high",
    tags: ["dairy", "calcium", "protein"]
  },
  {
    name: "Bread",
    category: "food",
    subcategory: "Bakery",
    description: "Fresh bread for daily consumption",
    defaultUnit: "packets",
    alternativeUnits: ["loaves", "pieces"],
    priority: "medium",
    tags: ["bakery", "carbohydrate", "breakfast"]
  },
  
  // Clothing items
  {
    name: "T-Shirts",
    category: "clothing",
    subcategory: "Upper Wear",
    description: "Clean and wearable t-shirts for children",
    defaultUnit: "pieces",
    alternativeUnits: ["sets", "pairs"],
    priority: "high",
    tags: ["casual", "comfortable", "daily wear"]
  },
  {
    name: "Pants/Jeans",
    category: "clothing",
    subcategory: "Lower Wear",
    description: "Pants and jeans for children",
    defaultUnit: "pieces",
    alternativeUnits: ["pairs", "sets"],
    priority: "high",
    tags: ["casual", "durable", "daily wear"]
  },
  {
    name: "Shoes",
    category: "clothing",
    subcategory: "Footwear",
    description: "Shoes and sandals for children",
    defaultUnit: "pairs",
    alternativeUnits: ["pieces", "sets"],
    priority: "medium",
    tags: ["footwear", "comfortable", "durable"]
  },
  
  // Education items
  {
    name: "Notebooks",
    category: "education",
    subcategory: "Stationery",
    description: "Notebooks for school work",
    defaultUnit: "pieces",
    alternativeUnits: ["sets", "packs"],
    priority: "high",
    tags: ["stationery", "school", "writing"]
  },
  {
    name: "Pencils",
    category: "education",
    subcategory: "Stationery",
    description: "Pencils for writing and drawing",
    defaultUnit: "pieces",
    alternativeUnits: ["packs", "boxes"],
    priority: "high",
    tags: ["stationery", "writing", "drawing"]
  },
  {
    name: "Books",
    category: "education",
    subcategory: "Reading Material",
    description: "Educational and story books for children",
    defaultUnit: "pieces",
    alternativeUnits: ["sets", "collections"],
    priority: "medium",
    tags: ["reading", "education", "knowledge"]
  },
  
  // Medical items
  {
    name: "First Aid Kit",
    category: "medical",
    subcategory: "Emergency Care",
    description: "Basic first aid supplies",
    defaultUnit: "kits",
    alternativeUnits: ["pieces", "sets"],
    priority: "high",
    tags: ["emergency", "health", "safety"]
  },
  {
    name: "Bandages",
    category: "medical",
    subcategory: "Wound Care",
    description: "Medical bandages for injuries",
    defaultUnit: "rolls",
    alternativeUnits: ["pieces", "packs"],
    priority: "medium",
    tags: ["wound care", "medical", "first aid"]
  },
  
  // Hygiene items
  {
    name: "Soap",
    category: "hygiene",
    subcategory: "Personal Care",
    description: "Bathing and hand washing soap",
    defaultUnit: "pieces",
    alternativeUnits: ["bars", "bottles"],
    priority: "high",
    tags: ["cleanliness", "personal care", "hygiene"]
  },
  {
    name: "Toothpaste",
    category: "hygiene",
    subcategory: "Oral Care",
    description: "Toothpaste for dental hygiene",
    defaultUnit: "tubes",
    alternativeUnits: ["pieces", "packs"],
    priority: "medium",
    tags: ["dental", "oral care", "hygiene"]
  },
  {
    name: "Sanitizer",
    category: "hygiene",
    subcategory: "Hand Care",
    description: "Hand sanitizer for cleanliness",
    defaultUnit: "bottles",
    alternativeUnits: ["pieces", "packs"],
    priority: "high",
    tags: ["cleanliness", "hand care", "hygiene"]
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    await OrphanageContact.deleteMany({});
    await DonationItem.deleteMany({});
    
    console.log('Existing data cleared');
    
    // Insert orphanage contacts
    const insertedOrphanages = await OrphanageContact.insertMany(orphanageContacts);
    console.log(`${insertedOrphanages.length} orphanage contacts inserted`);
    
    // Insert donation items
    const insertedItems = await DonationItem.insertMany(donationItems);
    console.log(`${insertedItems.length} donation items inserted`);
    
    console.log('Database seeding completed successfully!');
    
    // Display sample data
    console.log('\nSample orphanage contacts:');
    insertedOrphanages.forEach(orphanage => {
      console.log(`- ${orphanage.name}: ${orphanage.whatsappNumber}`);
    });
    
    console.log('\nSample donation items:');
    insertedItems.slice(0, 5).forEach(item => {
      console.log(`- ${item.name} (${item.category}): ${item.defaultUnit}`);
    });
    
  } catch (error) {
    console.error('Database seeding error:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run seeding
seedDatabase();
