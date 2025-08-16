import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, MapPin, User, LogOut, Bell, Settings, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
        }
      );
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Search Bar - Full width on mobile, contained on larger screens */}
          <div className="flex-1 max-w-2xl mx-4 lg:mx-0">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orphanages by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`
                    w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    transition-all duration-200 bg-white
                    ${isSearchFocused ? 'shadow-lg border-emerald-500' : 'hover:border-gray-400'}
                    text-sm lg:text-base
                  `}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Search Suggestions */}
              {isSearchFocused && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-3 py-1">Recent searches</div>
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors duration-200">
                        Orphanages in Mumbai
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors duration-200">
                        Children's homes in Delhi
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Side - User Info & Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            
            {/* Location Display */}
            {userLocation && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-gray-700 font-medium">Current Location</span>
              </div>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm lg:text-base">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user.email || 'user@example.com'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-40 animate-slide-up">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            // Navigate to profile
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            // Navigate to settings
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </button>
                        <button
                          onClick={() => {
                            // Navigate to notifications
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Bell className="w-4 h-4 mr-3" />
                          Notifications
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button className="btn-outline btn-sm hidden sm:inline-flex">
                  Sign In
                </button>
                <button className="btn-primary btn-sm">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
