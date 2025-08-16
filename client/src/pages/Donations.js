import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Eye, Calendar, MapPin, Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Donations = () => {
  const navigate = useNavigate();
  const { api, user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchDonations();
    fetchStats();
  }, [filters]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/donations?${queryParams}`);
      setDonations(response.data.donations);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/donations/stats/overview');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-error-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'in_progress':
        return <AlertCircle className="w-4 h-4 text-primary-500" />;
      default:
        return <Clock className="w-4 h-4 text-secondary-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'accepted':
        return 'bg-success-100 text-success-800';
      case 'rejected':
        return 'bg-error-100 text-error-800';
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'in_progress':
        return 'bg-primary-100 text-primary-800';
      default:
        return 'bg-secondary-100 text-secondary-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && donations.length === 0) {
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
          <h1 className="text-3xl font-bold text-secondary-900">My Donations</h1>
          <p className="text-secondary-600">Track your donation history and status</p>
        </div>
        <button
          onClick={() => navigate('/donate')}
          className="btn-primary flex items-center space-x-2"
        >
          <Heart className="w-4 h-4" />
          <span>Make New Donation</span>
        </button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.total}</div>
            <div className="text-sm text-secondary-600">Total Donations</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-warning-600">{stats.pending}</div>
            <div className="text-sm text-secondary-600">Pending</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success-600">{stats.accepted}</div>
            <div className="text-sm text-secondary-600">Accepted</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.completed}</div>
            <div className="text-sm text-secondary-600">Completed</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
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
              <option value="money">Money</option>
              <option value="hygiene">Hygiene</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Items per page</label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              className="input-field"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        {donations.map((donation) => (
          <div key={donation._id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">
                      {donation.category} - {donation.subcategory}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {donation.quantity} {donation.unit}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-secondary-400" />
                    <span className="text-secondary-600">
                      {donation.orphanage?.name || 'Unknown Orphanage'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-secondary-400" />
                    <span className="text-secondary-600">
                      {formatDate(donation.preferredDeliveryDate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-secondary-400" />
                    <span className="text-secondary-600 capitalize">
                      {donation.deliveryMethod}
                    </span>
                  </div>
                </div>

                {donation.description && (
                  <p className="text-sm text-secondary-700 mt-2">{donation.description}</p>
                )}

                {donation.notes?.orphanage && (
                  <div className="mt-2 p-2 bg-secondary-50 rounded-lg">
                    <p className="text-sm text-secondary-700">
                      <span className="font-medium">Orphanage Note:</span> {donation.notes.orphanage}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(donation.status)}
                    <span className="capitalize">{donation.status.replace('_', ' ')}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/donations/${donation._id}`)}
                  className="btn-outline text-sm py-1 px-3 flex items-center space-x-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>View</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {donations.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-secondary-400" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No donations found</h3>
            <p className="text-secondary-600 mb-4">
              {filters.status || filters.category 
                ? 'Try adjusting your filters or make your first donation.'
                : 'Make your first donation to help children in need.'
              }
            </p>
            <button
              onClick={() => navigate('/donate')}
              className="btn-primary"
            >
              Make a Donation
            </button>
          </div>
        )}
      </div>

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

export default Donations;
