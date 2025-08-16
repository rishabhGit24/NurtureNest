import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageSquare, Star, Send, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const feedbackTypes = [
    { value: 'general', label: 'General Feedback' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'improvement', label: 'Improvement Suggestion' },
    { value: 'other', label: 'Other' }
  ];

  const onSubmit = async (data) => {
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call - replace with actual feedback submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thank you for your feedback! We appreciate your input.');
      reset();
      setRating(0);
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarHover = (value) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Select Rating';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <MessageSquare className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">We'd Love Your Feedback</h1>
        <p className="text-secondary-600 max-w-2xl mx-auto">
          Your feedback helps us improve NurtureNest and make it better for everyone. 
          Share your thoughts, report issues, or suggest new features.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">
              Overall Rating *
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                    className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-secondary-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-lg font-medium text-secondary-700">
                {getRatingText(hoverRating || rating)}
              </span>
            </div>
            {rating === 0 && (
              <p className="mt-1 text-sm text-error-600">Please provide a rating</p>
            )}
          </div>

          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Feedback Type *
            </label>
            <select
              {...register('type', { required: 'Please select a feedback type' })}
              className="input-field"
            >
              <option value="">Select feedback type</option>
              {feedbackTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-error-600">{errors.type.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              {...register('subject', {
                required: 'Subject is required',
                minLength: { value: 5, message: 'Subject must be at least 5 characters' }
              })}
              className="input-field"
              placeholder="Brief summary of your feedback"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-error-600">{errors.subject.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 20, message: 'Description must be at least 20 characters' }
              })}
              rows="5"
              className="input-field"
              placeholder="Please provide detailed information about your feedback, suggestion, or issue..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="input-field"
                placeholder="Your name (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className="input-field"
                placeholder="Your email (optional)"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-secondary-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Feedback Guidelines */}
      <div className="card bg-secondary-50 border-secondary-200">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Feedback Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary-700">
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">For Bug Reports:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Describe what you were trying to do</li>
              <li>Explain what happened instead</li>
              <li>Include steps to reproduce the issue</li>
              <li>Mention your device and browser</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">For Feature Requests:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Explain the problem you're trying to solve</li>
              <li>Describe your proposed solution</li>
              <li>Explain how it would benefit users</li>
              <li>Provide examples if possible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card bg-primary-50 border-primary-200 text-center">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Need Immediate Help?</h3>
        <p className="text-primary-700 mb-4">
          If you need urgent assistance or have a critical issue, please contact our support team directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center space-x-2 text-primary-700">
            <MessageSquare className="w-4 h-4" />
            <span>support@nurturenest.com</span>
          </div>
          <div className="flex items-center space-x-2 text-primary-700">
            <Heart className="w-4 h-4" />
            <span>We typically respond within 24 hours</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-secondary-200">
        <p className="text-secondary-500">
          Thank you for helping us make NurtureNest better! 💙
        </p>
      </div>
    </div>
  );
};

export default Feedback;
