'use client';

import { useState, useEffect } from 'react';
import { FaSync, FaSearch, FaFilter, FaEnvelope, FaPhone, FaCar, FaUser, FaMoneyBill, FaMobile, FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LayoutXPadding from "../components/LayoutXPadding"

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyDQo35Q_emKjMYK4zd-zQ-pVXm2wwd51Lk",
  authDomain: "valetbookingapp.firebaseapp.com",
  databaseURL: "https://valetbookingapp-default-rtdb.firebaseio.com",
  projectId: "valetbookingapp",
  storageBucket: "valetbookingapp.appspot.com",
  messagingSenderId: "582291223613",
  appId: "1:582291223613:web:2721c2b8a80ef140f2e654"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    licensePlate: '',
    vehicleColor: '',
    company: '',
    date: '',
    startTime: '',
    endTime: '',
    paymentMethod: 'cash',
    status: 'upcoming' // Added status to edit form
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);

  useEffect(() => {
    const bookingsRef = ref(database, 'bookings');
    
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      const records = [];
      
      for (const id in data) {
        records.push({
          id,
          ...data[id],
          status: data[id].status || calculateStatus(data[id]) // Use stored status or calculate
        });
      }
      
      // Sort by timestamp (newest first)
      records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setBookings(records);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function calculateStatus(booking) {
    const now = new Date();
    const startDateTime = new Date(`${booking.date}T${booking.startTime}`);
    const endDateTime = new Date(`${booking.date}T${booking.endTime}`);
    
    if (now < startDateTime) return 'upcoming';
    if (now >= startDateTime && now <= endDateTime) return 'active';
    return 'completed';
  }

  const handleEditClick = (booking) => {
    setEditingId(booking.id);
    setEditFormData({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      vehicleMake: booking.vehicleMake,
      vehicleModel: booking.vehicleModel,
      licensePlate: booking.licensePlate,
      vehicleColor: booking.vehicleColor,
      company: booking.company || '',
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      paymentMethod: booking.paymentMethod || 'cash',
      status: booking.status || calculateStatus(booking) // Include status in edit form
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleUpdate = (id) => {
    const bookingRef = ref(database, `bookings/${id}`);
    update(bookingRef, editFormData)
      .then(() => {
        setEditingId(null);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleDelete = (id) => {
    const bookingRef = ref(database, `bookings/${id}`);
    remove(bookingRef)
      .then(() => {
        setShowDeleteConfirm(null);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleClearAll = () => {
    const bookingsRef = ref(database, 'bookings');
    remove(bookingsRef)
      .then(() => {
        setShowClearAllConfirm(false);
      })
      .catch((error) => {
        console.error("Error clearing all bookings: ", error);
      });
  };

  // Function to clear old bookings (older than one week)
  const clearOldBookings = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const oldBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.timestamp);
      return bookingDate < oneWeekAgo;
    });

    if (oldBookings.length === 0) {
      alert('No bookings older than one week found.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${oldBookings.length} bookings older than one week?`)) {
      const deletePromises = oldBookings.map(booking => {
        const bookingRef = ref(database, `bookings/${booking.id}`);
        return remove(bookingRef);
      });

      Promise.all(deletePromises)
        .then(() => {
          alert(`Successfully deleted ${oldBookings.length} old bookings.`);
        })
        .catch(error => {
          console.error("Error deleting old bookings: ", error);
          alert('An error occurred while deleting old bookings.');
        });
    }
  };

  const filteredBookings = bookings.filter(booking => {
    // Search filter - now only by name
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const refreshData = () => {
    setLoading(true);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      upcoming: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      pending: 'bg-gray-100 text-gray-800' // Added for manual status
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status] || ''}`}>
        {status}
      </span>
    );
  };

  const getPaymentBadge = (method) => {
    const methodClasses = {
      cash: 'bg-gray-100 text-gray-800',
      credit: 'bg-purple-100 text-purple-800',
      mobile: 'bg-indigo-100 text-indigo-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${methodClasses[method] || 'bg-gray-100 text-gray-800'}`}>
        {method === 'cash' && <FaMoneyBill className="inline mr-1" />}
        {method === 'credit' && <FaMoneyBill className="inline mr-1" />}
        {method === 'mobile' && <FaMobile className="inline mr-1" />}
        {method}
      </span>
    );
  };

  const formatDateTime = (dateStr, timeStr) => {
    const date = new Date(`${dateStr}T${timeStr}`);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className=" bg-gray-50 p-4 sm:p-6">
       <LayoutXPadding>
          <div className="relative top-2">
            <Navbar />
          </div>
        </LayoutXPadding>
      <div className="w-[97%] mt-16 mx-auto">
        <div className="flex flex-col justify-between mb-6 gap-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaCar className="text-3xl text-indigo-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Manage All Bookings
              </h1>
              <p className="mt-3 text-xs  sm:text-base w-[80%] sm:w-[60%] text-gray-600  mx-auto">
                Easily view and manage your valet parking reservations with our seamless booking system.
              </p>
          </div>
        </div>

        {/* Database Management Buttons */}
        <div className="flex justify-end gap-4 mb-4">
          <button 
            onClick={clearOldBookings}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm flex items-center"
          >
            <FaTrash className="mr-2" />
            Clear Old Bookings (1+ week)
          </button>
          <button 
            onClick={() => setShowClearAllConfirm(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm flex items-center"
            disabled={bookings.length === 0}
          >
            <FaTrash className="mr-2" />
            Clear All Bookings
          </button>
        </div>

        {/* Clear All Confirmation Modal */}
        {showClearAllConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Confirm Clear All Bookings</h3>
              <p className="mb-4">Are you sure you want to delete ALL {bookings.length} bookings? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowClearAllConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-3xl">
              <thead className="bg-gray-50 rounded-3xl">
                <tr className='rounded-3xl'>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Period
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 sm:px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <FaSync className="animate-spin text-2xl text-indigo-600" />
                      </div>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 sm:px-6 py-4 text-center text-gray-500">
                      No bookings found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      {editingId === booking.id ? (
                        <>
                          {/* Editable Customer Info */}
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <FaUser className="text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <input
                                  type="text"
                                  name="name"
                                  value={editFormData.name}
                                  onChange={handleEditFormChange}
                                  className="text-sm font-medium text-gray-900 border border-gray-300 rounded p-1 mb-1 w-full"
                                />
                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                  <FaEnvelope className="mr-1" />
                                  <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleEditFormChange}
                                    className="border border-gray-300 rounded p-1 w-full"
                                  />
                                </div>
                                <div className="text-xs text-gray-500 flex items-center">
                                  <FaPhone className="mr-1" />
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={editFormData.phone}
                                    onChange={handleEditFormChange}
                                    className="border border-gray-300 rounded p-1 w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          {/* Editable Vehicle Info */}
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              <input
                                type="text"
                                name="vehicleMake"
                                value={editFormData.vehicleMake}
                                onChange={handleEditFormChange}
                                placeholder="Make"
                                className="border border-gray-300 rounded p-1 w-1/3 mr-1"
                              />
                              <input
                                type="text"
                                name="vehicleModel"
                                value={editFormData.vehicleModel}
                                onChange={handleEditFormChange}
                                placeholder="Model"
                                className="border border-gray-300 rounded p-1 w-2/3"
                              />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <FaCar className="inline mr-1" />
                              Plate: 
                              <input
                                type="text"
                                name="licensePlate"
                                value={editFormData.licensePlate}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded p-1 ml-1"
                              />
                            </div>
                            <div className="text-xs text-gray-500">
                              Color: 
                              <input
                                type="text"
                                name="vehicleColor"
                                value={editFormData.vehicleColor}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded p-1 ml-1 capitalize"
                              />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Company: 
                              <input
                                type="text"
                                name="company"
                                value={editFormData.company}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded p-1 ml-1"
                              />
                            </div>
                          </td>
                          
                          {/* Editable Booking Period */}
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm text-gray-900">
                              Date: 
                              <input
                                type="date"
                                name="date"
                                value={editFormData.date}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded p-1 ml-1"
                              />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Start: 
                              <input
                                type="time"
                                name="startTime"
                                value={editFormData.startTime}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded p-1 ml-1"
                              />
                            </div>
                            <div className="text-xs text-gray-500">
                              End: 
                              <input
                                type="time"
                                name="endTime"
                                value={editFormData.endTime}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded p-1 ml-1"
                              />
                            </div>
                          </td>
                          
                          {/* Editable Status/Payment */}
                          <td className="px-4 sm:px-6 py-4">
                            <div className="mb-1">
                              <select
                                name="status"
                                value={editFormData.status}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded p-1 text-xs w-full"
                              >
                                <option value="upcoming">Upcoming</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                              </select>
                            </div>
                            <div>
                              <select
                                name="paymentMethod"
                                value={editFormData.paymentMethod}
                                onChange={handleEditFormChange}
                                className="border border-gray-300 rounded p-1 text-xs w-full"
                              >
                                <option value="cash">Cash</option>
                                <option value="credit">Credit</option>
                                <option value="mobile">Mobile</option>
                              </select>
                            </div>
                          </td>
                          
                          {/* Edit Actions */}
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                            <button 
                              onClick={() => handleUpdate(booking.id)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              <FaCheck className="inline mr-1" /> Save
                            </button>
                            <button 
                              onClick={() => setEditingId(null)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <FaTimes className="inline mr-1" /> Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          {/* Read-only Customer Info */}
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <FaUser className="text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                  <FaEnvelope className="mr-1" />
                                  {booking.email}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center">
                                  <FaPhone className="mr-1" />
                                  {booking.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          {/* Read-only Vehicle Info */}
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.vehicleMake} {booking.vehicleModel}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <FaCar className="inline mr-1" />
                              Plate: {booking.licensePlate}
                            </div>
                            <div className="text-xs text-gray-500">
                              Color: <span className="capitalize">{booking.vehicleColor}</span>
                            </div>
                            {booking.company && (
                              <div className="text-xs text-gray-500 mt-1">
                                Company: {booking.company}
                              </div>
                            )}
                          </td>
                          
                          {/* Read-only Booking Period */}
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {formatDateTime(booking.date, booking.startTime)}
                            </div>
                            <div className="text-xs text-gray-500">
                              to {formatDateTime(booking.date, booking.endTime)}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Booked: {new Date(booking.timestamp).toLocaleString()}
                            </div>
                          </td>
                          
                          {/* Read-only Status/Payment */}
                          <td className="px-4 sm:px-6 py-4">
                            <div className="mb-1">
                              {getStatusBadge(booking.status)}
                            </div>
                            <div>
                              {getPaymentBadge(booking.paymentMethod)}
                            </div>
                          </td>
                          
                          {/* Read-only Actions */}
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                            {showDeleteConfirm === booking.id ? (
                              <div className="flex items-center">
                                <span className="mr-2 text-xs">Confirm?</span>
                                <button 
                                  onClick={() => handleDelete(booking.id)}
                                  className="text-red-600 hover:text-red-900 mr-2"
                                >
                                  <FaCheck className="inline" />
                                </button>
                                <button 
                                  onClick={() => setShowDeleteConfirm(null)}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <FaTimes className="inline" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <button 
                                  onClick={() => handleEditClick(booking)}
                                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                                >
                                  <FaEdit className="inline mr-1" /> Edit
                                </button>
                                <button 
                                  onClick={() => setShowDeleteConfirm(booking.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 gap-2">
          <div>
            Showing <span className="font-medium">{filteredBookings.length}</span> of <span className="font-medium">{bookings.length}</span> bookings
          </div>
          <div>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}