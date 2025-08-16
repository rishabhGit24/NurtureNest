import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Users, 
  Gift, 
  Heart, 
  MessageSquare, 
  Info,
  Menu,
  X,
  MapPin,
  Phone
} from 'lucide-react';

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Orphanages', href: '/orphanages', icon: Users },
    { name: 'My Donations', href: '/donations', icon: Gift },
    { name: 'Donate Now', href: '/donate', icon: Heart },
    { name: 'Feedback', href: '/feedback', icon: MessageSquare },
    { name: 'About Us', href: '/about', icon: Info },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:z-auto
        w-64 lg:w-72
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">NurtureNest</h1>
              <p className="text-sm text-gray-500">Donation Platform</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || 'user@example.com'}
                </p>
              </div>
            </div>
            
            {/* User Contact Info */}
            {user.phone && (
              <div className="mt-3 flex items-center space-x-2 text-xs text-gray-600">
                <Phone className="w-3 h-3" />
                <span>{user.phone}</span>
              </div>
            )}
            
            {user.address?.city && (
              <div className="mt-1 flex items-center space-x-2 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>{user.address.city}, {user.address.state}</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={closeMobileMenu}
                className={`
                  sidebar-item group relative
                  ${isActive ? 'active' : ''}
                `}
              >
                <item.icon className={`
                  w-5 h-5 mr-3 transition-colors duration-200
                  ${isActive ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-600'}
                `} />
                <span className="font-medium">{item.name}</span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          {user ? (
            <button
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
              className="w-full btn-secondary text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          ) : (
            <div className="space-y-2">
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className="w-full btn-primary"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                onClick={closeMobileMenu}
                className="w-full btn-outline"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {/* Close Button for Mobile */}
        <button
          onClick={closeMobileMenu}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

// LogOut icon component
const LogOut = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default Sidebar;
