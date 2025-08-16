import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Navigation, Heart, Users, BookOpen, Stethoscope, DollarSign, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [orphanages, setOrphanages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Mock orphanage data for demonstration
  useEffect(() => {
    const mockOrphanages = [
      {
        id: 1,
        name: "Vatsalyapuram Trust",
        description: "Providing care and education to underprivileged children",
        location: { lat: 19.0760, lng: 72.8777 },
        address: "Mumbai, Maharashtra",
        capacity: 150,
        currentNeeds: ["Food", "Clothes", "Education"]
      },
      {
        id: 2,
        name: "Children's Hope Foundation",
        description: "Supporting children with love and care",
        location: { lat: 28.7041, lng: 77.1025 },
        address: "Delhi, NCR",
        capacity: 200,
        currentNeeds: ["Medical", "Hygiene", "Food"]
      },
      {
        id: 3,
        name: "Little Angels Home",
        description: "Creating a nurturing environment for children",
        location: { lat: 12.9716, lng: 77.5946 },
        address: "Bangalore, Karnataka",
        capacity: 120,
        currentNeeds: ["Education", "Clothes", "Hygiene"]
      }
    ];
    setOrphanages(mockOrphanages);
  }, []);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          // Set default location (Mumbai)
          setUserLocation({ lat: 19.0760, lng: 72.8777 });
        }
      );
    }
  }, []);

  const handleRelocate = () => {
    if (userLocation) {
      // Center map on user location
      console.log('Relocating to user location:', userLocation);
    }
  };

  const handleDonateNow = (category, subcategory) => {
    navigate('/donate', { 
      state: { 
        category, 
        subcategory 
      } 
    });
  };

  const donationCategories = [
    {
      name: "Food",
      icon: Heart,
      color: "from-orange-500 to-red-500",
      subcategories: [
        { name: "Plate Meals", description: "Ready-to-eat meals" },
        { name: "Bulk Items", description: "Rice, wheat, pulses" },
        { name: "Raw Items", description: "Vegetables, fruits" },
        { name: "Processed Items", description: "Packaged food items" }
      ]
    },
    {
      name: "Clothes",
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      subcategories: [
        { name: "Men", description: "Clothing for men" },
        { name: "Women", description: "Clothing for women" },
        { name: "Kids", description: "Clothing for children" }
      ]
    },
    {
      name: "Education",
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      subcategories: [
        { name: "Stationery", description: "Pens, notebooks, etc." },
        { name: "Bags", description: "School bags, backpacks" },
        { name: "Essentials", description: "Basic school supplies" }
      ]
    },
    {
      name: "Medical",
      icon: Stethoscope,
      color: "from-red-500 to-pink-500",
      subcategories: [
        { name: "Cotton", description: "Medical cotton, bandages" },
        { name: "Tapes", description: "Medical tapes" },
        { name: "Scissors", description: "Medical scissors" },
        { name: "Dettol", description: "Antiseptic solutions" }
      ]
    },
    {
      name: "Money",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      subcategories: [
        { name: "UPI Donations", description: "Digital payments" }
      ]
    },
    {
      name: "Hygiene",
      icon: Droplets,
      color: "from-cyan-500 to-blue-500",
      subcategories: [
        { name: "Brushing Essentials", description: "Toothbrushes, toothpaste" },
        { name: "Soap", description: "Bathing soaps" },
        { name: "Skin Care", description: "Skincare products" },
        { name: "Other Amenities", description: "Hygiene products" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="container-responsive section-padding">
          <div className="text-center space-y-6">
            <h1 className="heading-responsive font-bold leading-tight">
              Welcome to <span className="text-yellow-300">NurtureNest</span>
            </h1>
            <p className="subheading-responsive text-emerald-100 max-w-3xl mx-auto">
              Connect with orphanages and NGOs to make meaningful donations. 
              Every contribution makes a difference in a child's life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/donate')}
                className="btn-primary btn-lg text-lg shadow-strong hover:shadow-xl"
              >
                Start Donating Today
              </button>
              <button 
                onClick={() => navigate('/orphanages')}
                className="btn-primary btn-lg text-lg border-white text-white hover:bg-white hover:text-emerald-600"
              >
                Explore Orphanages
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="section-padding">
        <div className="container-responsive">
          <div className="space-y-6">
            {/* Map Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="heading-responsive font-bold text-gray-900">
                  Find Orphanages Near You
                </h2>
                <p className="subheading-responsive text-gray-600 mt-2">
                  Discover orphanages in your area and see their current needs
                </p>
              </div>
              
              {/* Map Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRelocate}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Relocate</span>
                </button>
                <button
                  onClick={() => navigate('/orphanages')}
                  className="btn-primary"
                >
                  View All Orphanages
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="h-96 lg:h-[500px] bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-emerald-600 mx-auto" />
                    <p className="text-gray-600">Mapbox integration will be here</p>
                    <p className="text-sm text-gray-500">Showing {orphanages.length} orphanages</p>
                  </div>
                </div>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 hidden lg:block">
                <div className="text-xs font-medium text-gray-700 mb-2">Map Legend</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Orphanage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Your Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Categories Section */}
      <div className="section-padding bg-white">
        <div className="container-responsive">
          <div className="text-center space-y-6 mb-12">
            <h2 className="heading-responsive font-bold text-gray-900">
              What Would You Like to Donate?
            </h2>
            <p className="subheading-responsive text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive categories and make a targeted donation 
              that directly addresses specific needs.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid-responsive grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {donationCategories.map((category) => (
              <div key={category.name} className="card-hover p-responsive-lg">
                <div className="text-center space-y-4">
                  {/* Category Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Category Name */}
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  
                  {/* Subcategories */}
                  <div className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory.name}
                        onClick={() => handleDonateNow(category.name, subcategory.name)}
                        className="w-full p-3 text-left bg-gray-50 hover:bg-emerald-50 rounded-lg transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 group-hover:text-emerald-700">
                              {subcategory.name}
                            </p>
                            <p className="text-sm text-gray-500 group-hover:text-gray-600">
                              {subcategory.description}
                            </p>
                          </div>
                          <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="text-emerald-600 text-xs">→</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/donate')}
              className="btn-primary btn-lg text-lg shadow-strong hover:shadow-xl"
            >
              Start Your Donation Journey
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="section-padding bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="container-responsive">
          <div className="grid-responsive grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-emerald-600">150+</div>
              <div className="text-sm lg:text-base text-gray-600">Orphanages</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-teal-600">2,500+</div>
              <div className="text-sm lg:text-base text-gray-600">Children Helped</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-cyan-600">5,000+</div>
              <div className="text-sm lg:text-base text-gray-600">Donations</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600">100%</div>
              <div className="text-sm lg:text-base text-gray-600">Transparent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
