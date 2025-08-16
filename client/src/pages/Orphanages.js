import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, MapPin, Users, Search, Filter, Eye, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const Orphanages = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { api } = useAuth();
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    city: '',
    state: '',
    category: '',
    verified: 'true',
    page: 1,
    limit: 20
  });

  useEffect(() => {
    fetchOrphanages();
  }, [filters]);

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'page' && key !== 'limit') {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const fetchOrphanages = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/orphanages?${queryParams}`);
      setOrphanages(response.data.orphanages);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch orphanages:', error);
      toast.error('Failed to load orphanages');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (filters.search.trim()) {
      handleFilterChange('search', filters.search.trim());
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      state: '',
      category: '',
      verified: 'true',
      page: 1,
      limit: 20
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'food':
        return '🍽️';
      case 'clothes':
        return '👕';
      case 'education':
        return '📚';
      case 'medical':
        return '🏥';
      case 'hygiene':
        return '🧼';
      default:
        return '📦';
    }
  };

  if (loading && orphanages.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Orphanages</h1>
          <p className="text-secondary-600">Find and connect with orphanages in your area</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Search Bar */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search orphanages by name or description..."
                  className="input-field pl-10"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">City</label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                placeholder="Enter city"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">State</label>
              <input
                type="text"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                placeholder="Enter state"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                <option value="food">Food</option>
                <option value="clothes">Clothes</option>
                <option value="education">Education</option>
                <option value="medical">Medical</option>
                <option value="hygiene">Hygiene</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Verification</label>
              <select
                value={filters.verified}
                onChange={(e) => handleFilterChange('verified', e.target.value)}
                className="input-field"
              >
                <option value="true">Verified Only</option>
                <option value="">All</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-secondary-500" />
              <span className="text-sm text-secondary-600">Active Filters:</span>
              {Object.entries(filters).map(([key, value]) => {
                if (value && key !== 'page' && key !== 'limit' && key !== 'verified') {
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {key}: {value}
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-secondary-600 hover:text-secondary-800"
            >
              Clear All
            </button>
          </div>
        </form>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-secondary-600">
          Showing {orphanages.length} of {pagination.totalItems || 0} orphanages
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-secondary-600">Items per page:</span>
          <select
            value={filters.limit}
            onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
            className="input-field text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Orphanages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orphanages.map((orphanage) => (
          <div key={orphanage._id} className="card hover:shadow-lg transition-all duration-200">
            {/* Orphanage Image */}
            <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
              {orphanage.images && orphanage.images.length > 0 ? (
                <img
                  src={orphanage.images[0]}
                  alt={orphanage.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <Heart className="w-16 h-16 text-primary-400 mx-auto mb-2" />
                  <p className="text-primary-600 font-medium">No Image</p>
                </div>
              )}
              
              {/* Verification Badge */}
              {orphanage.verificationStatus === 'verified' && (
                <div className="absolute top-3 right-3 bg-success-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  ✓ Verified
                </div>
              )}
            </div>

            {/* Orphanage Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                  {orphanage.name}
                </h3>
                <p className="text-sm text-secondary-600 line-clamp-2">
                  {orphanage.description}
                </p>
              </div>

              {/* Location and Capacity */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-secondary-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {orphanage.address.city}, {orphanage.address.state}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-secondary-600">
                  <Users className="w-4 h-4" />
                  <span>
                    {orphanage.currentOccupancy} / {orphanage.capacity} children
                  </span>
                </div>
              </div>

              {/* Current Needs */}
              {orphanage.needs && orphanage.needs.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-secondary-700 mb-2">Current Needs:</p>
                  <div className="flex flex-wrap gap-2">
                    {orphanage.needs.slice(0, 3).map((need, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary-100 text-secondary-700"
                      >
                        {getCategoryIcon(need.category)} {need.subcategory}
                      </span>
                    ))}
                    {orphanage.needs.length > 3 && (
                      <span className="text-xs text-secondary-500">
                        +{orphanage.needs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-3 border-t border-secondary-200">
                <button
                  onClick={() => navigate('/donate', { state: { selectedOrphanage: orphanage } })}
                  className="btn-primary flex-1 text-sm py-2"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Donate
                </button>
                <button
                  onClick={() => navigate(`/orphanages/${orphanage._id}`)}
                  className="btn-outline text-sm py-2 px-3"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orphanages.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-secondary-400" />
          </div>
          <h3 className="text-lg font-medium text-secondary-900 mb-2">No orphanages found</h3>
          <p className="text-secondary-600 mb-4">
            {filters.search || filters.city || filters.state || filters.category
              ? 'Try adjusting your search criteria or filters.'
              : 'There are currently no orphanages available in your area.'
            }
          </p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page <= 1}
            className="px-3 py-2 border border-secondary-300 rounded-lg text-sm font-medium text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                page === filters.page
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page >= pagination.totalPages}
            className="px-3 py-2 border border-secondary-300 rounded-lg text-sm font-medium text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orphanages;
