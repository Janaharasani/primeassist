"use client";
import { useState } from 'react';
import { FaCar, FaUser, FaPhone, FaClock, FaCalendarAlt, FaInfoCircle, FaCreditCard, FaLock } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdBusiness } from 'react-icons/md';
import { database } from '../firebase';
import { ref, push } from 'firebase/database';

const ValetParkingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleColor: '',
    licensePlate: '',
    date: '',
    startTime: '',
    endTime: '',
    specialInstructions: '',
    paymentMethod: 'cash',
    company: '',
    status: 'pending' // Added status field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
  
    try {
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString()
      };
  
      // Use Firebase SDK to push data
      const bookingsRef = ref(database, 'bookings');
      await push(bookingsRef, submissionData);
  
      // Clear form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleColor: '',
        licensePlate: '',
        date: '',
        startTime: '',
        endTime: '',
        specialInstructions: '',
        paymentMethod: 'cash',
        company: '',
        status: 'pending'
      });
  
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (

    <div
    style={{ backgroundColor: '#000F2B' }}
    className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-white"
  >
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <FaCar className="text-3xl text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Valet Parking Booking
          </h1>
          <p className="mt-3 text-lg text-white max-w-md mx-auto">
            Reserve your spot with our premium valet service in just a few clicks
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="px-2 py-8 md:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FaUser className="text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Personal Information:
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="John Doe"
                        required
                      />
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="john@example.com"
                        required
                      />
                      <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-blue-200  mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="flex items-center border border-gray-300 rounded-3xl outline-none focus-within:ring-indigo-500 focus-within:border-indigo-500">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-4 pr-4 py-3 border-none outline-none rounded-3xl bg-transparent"
                          placeholder="+966 12 345 6789"
                          required
                        />
                        <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="company" className="block text-sm font-medium text-blue-200 mb-1">
                      Number of Persons
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Number of Persons"
                      />
                      <MdBusiness className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FaCar className="text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Vehicle Information:
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="vehicleMake" className="block text-sm font-medium text-blue-200 mb-1">
                      Vehicle Make
                    </label>
                    <input
                      type="text"
                      id="vehicleMake"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Toyota, BMW, etc."
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="vehicleModel" className="block text-sm font-medium text-blue-200 mb-1">
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Camry, X5, etc."
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="vehicleColor" className="block text-sm font-medium text-blue-200 mb-1">
                      Vehicle Color
                    </label>
                    <input
                      type="text"
                      id="vehicleColor"
                      name="vehicleColor"
                      value={formData.vehicleColor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Red, Blue, etc."
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="licensePlate" className="block text-sm font-medium text-blue-200 mb-1">
                      License Plate
                    </label>
                    <input
                      type="text"
                      id="licensePlate"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="ABC-1234"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Parking Details Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FaClock className="text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Parking Details:
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="relative">
                    <label htmlFor="date" className="block text-sm font-medium text-blue-200 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                      />
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="startTime" className="block text-sm font-medium text-blue-200 mb-1">
                      Start Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                      />
                      <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="endTime" className="block text-sm font-medium text-blue-200  mb-1">
                      End Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                      />
                      <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FaLock className="text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Booking Status:
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3   p-4 rounded-3xl border border-gray-200 hover:border-indigo-400 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'pending'}
                      onChange={() => handleStatusChange('pending')}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex flex-col">
                      <span className="block text-sm font-medium text-white ">Pending</span>
                      <span className="block text-xs text-white ">Booking is awaiting confirmation</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3   p-4 rounded-3xl border border-gray-200 hover:border-indigo-400 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'completed'}
                      onChange={() => handleStatusChange('completed')}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex flex-col">
                      <span className="block text-sm font-medium text-white ">Completed</span>
                      <span className="block text-xs text-white ">Booking has been fulfilled</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FaInfoCircle className="text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Additional Information:
                  </h2>
                </div>
                
                <div>
                  <label htmlFor="specialInstructions" className="block text-sm font-medium text-blue-200  mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-3xl outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Any special requests or instructions for our valet..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200  mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3  p-4 rounded-3xl border border-gray-200 hover:border-indigo-400 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="flex items-center">
                        <span className="block text-sm font-medium text-white">Cash</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3   p-4 rounded-3xl border border-gray-200 hover:border-indigo-400 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit"
                        checked={formData.paymentMethod === 'credit'}
                        onChange={handleChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="flex items-center">
                        <FaCreditCard className="text-gray-500 mr-2" />
                        <span className="block text-sm font-medium text-white ">Credit Card</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3  p-4 rounded-3xl border border-gray-200 hover:border-indigo-400 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile"
                        checked={formData.paymentMethod === 'mobile'}
                        onChange={handleChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <span className="block text-sm font-medium text-white ">Mobile Payment</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-4">
              

                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 rounded-4xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 shadow-md hover:shadow-lg"
                >
                  ← Back to Home
                </button>
                
                

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 rounded-4xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Book Valet Parking'
                  )}
                </button>
              </div>
              {submitError && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                  Booking submitted successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValetParkingForm;