// ✅ File: src/app/admin/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit3, Trash2, Eye, Filter, Grid, List, Upload, X, Check, AlertCircle, Package, DollarSign, Calendar, User } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock data for demonstration - replace with actual API calls
const mockMedicines = [
  {
    _id: '1',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 25.99,
    description: 'Effective pain and fever relief medication',
    stock: 150,
    manufacturer: 'HealthCorp Ltd',
    expiryDate: '2025-12-31',
    prescriptionRequired: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    _id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 45.50,
    description: 'Broad-spectrum antibiotic for bacterial infections',
    stock: 75,
    manufacturer: 'PharmaCare Inc',
    expiryDate: '2025-08-15',
    prescriptionRequired: true,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    createdAt: '2024-02-10',
    status: 'active'
  }
];

const AdminPage = () => {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'add', 'edit', 'manage', 'view'
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: '',
    manufacturer: '',
    expiryDate: '',
    prescriptionRequired: false,
    image: null,
    imagePreview: ''
  });

  const categories = ['Pain Relief', 'Antibiotics', 'Vitamins', 'Heart Medicine', 'Diabetes', 'Blood Pressure', 'Other'];

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add medicine
  const handleAddMedicine = async () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.manufacturer || !formData.expiryDate) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newMedicine = {
        ...formData,
        _id: Date.now().toString(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active',
        image: formData.imagePreview || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
      };
      
      setMedicines(prev => [newMedicine, ...prev]);
      setFormData({
        name: '', category: '', price: '', description: '', stock: '',
        manufacturer: '', expiryDate: '', prescriptionRequired: false,
        image: null, imagePreview: ''
      });
      setCurrentView('manage');
      showNotification('Medicine added successfully!');
      setIsLoading(false);
    }, 1000);
  };

  // Edit medicine
  const handleEditMedicine = async () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.manufacturer || !formData.expiryDate) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setMedicines(prev => prev.map(med => 
        med._id === selectedMedicine._id 
          ? { ...med, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
          : med
      ));
      setCurrentView('manage');
      showNotification('Medicine updated successfully!');
      setIsLoading(false);
    }, 1000);
  };

  // Delete medicine
  const handleDeleteMedicine = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(prev => prev.filter(med => med._id !== id));
      showNotification('Medicine deleted successfully!', 'error');
    }
  };

  // Start editing
  const startEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setFormData({
      ...medicine,
      imagePreview: medicine.image
    });
    setCurrentView('edit');
  };

  // Filter medicines
  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || med.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get low stock medicines
  const lowStockMedicines = medicines.filter(med => med.stock < 50);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            <span>{notification.message}</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Professional Medicine Management System</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'dashboard' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('manage')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'manage' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Manage Medicines
                </button>
                <button
                  onClick={() => {
                    setCurrentView('add');
                    setFormData({
                      name: '', category: '', price: '', description: '', stock: '',
                      manufacturer: '', expiryDate: '', prescriptionRequired: false,
                      image: null, imagePreview: ''
                    });
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add Medicine</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <div>
              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Medicines</p>
                      <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
                    </div>
                    <Package className="text-blue-600" size={32} />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Low Stock</p>
                      <p className="text-2xl font-bold text-red-600">{lowStockMedicines.length}</p>
                    </div>
                    <AlertCircle className="text-red-600" size={32} />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Value</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${medicines.reduce((sum, med) => sum + (med.price * med.stock), 0).toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className="text-green-600" size={32} />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Categories</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {new Set(medicines.map(med => med.category)).size}
                      </p>
                    </div>
                    <Filter className="text-purple-600" size={32} />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    onClick={() => {
                      setCurrentView('add');
                      setFormData({
                        name: '', category: '', price: '', description: '', stock: '',
                        manufacturer: '', expiryDate: '', prescriptionRequired: false,
                        image: null, imagePreview: ''
                      });
                    }}
                    className="bg-green-600 text-white rounded-lg shadow p-6 text-center hover:bg-green-700 transition"
                  >
                    <Plus className="mx-auto mb-2" size={32} />
                    <h3 className="text-xl font-semibold mb-2">Add Medicine</h3>
                    <p>Add new medicines to your database.</p>
                  </button>

                  <button
                    onClick={() => setCurrentView('manage')}
                    className="bg-blue-600 text-white rounded-lg shadow p-6 text-center hover:bg-blue-700 transition"
                  >
                    <Package className="mx-auto mb-2" size={32} />
                    <h3 className="text-xl font-semibold mb-2">Manage Medicines</h3>
                    <p>View, edit, or delete medicines.</p>
                  </button>

                  <div className="bg-yellow-600 text-white rounded-lg shadow p-6 text-center">
                    <AlertCircle className="mx-auto mb-2" size={32} />
                    <h3 className="text-xl font-semibold mb-2">Low Stock Alert</h3>
                    <p>{lowStockMedicines.length} medicines need restocking.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manage Medicines View */}
          {currentView === 'manage' && (
            <div className="bg-white rounded-xl shadow-sm">
              {/* Search and Filter Bar */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-1 gap-4 w-full sm:w-auto">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search medicines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Medicines Display */}
              <div className="p-6">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMedicines.map(medicine => (
                      <div key={medicine._id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="relative mb-4">
                          <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {medicine.stock < 50 && (
                            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                              Low Stock
                            </span>
                          )}
                          {medicine.prescriptionRequired && (
                            <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                              Rx Required
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{medicine.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{medicine.category}</p>
                        <p className="text-lg font-bold text-green-600 mb-2">${medicine.price}</p>
                        <p className="text-sm text-gray-600 mb-4">Stock: {medicine.stock}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEdit(medicine)}
                            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Edit3 size={16} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMedicine(medicine._id)}
                            className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4">Medicine</th>
                          <th className="text-left py-3 px-4">Category</th>
                          <th className="text-left py-3 px-4">Price</th>
                          <th className="text-left py-3 px-4">Stock</th>
                          <th className="text-left py-3 px-4">Expiry</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMedicines.map(medicine => (
                          <tr key={medicine._id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <img src={medicine.image} alt={medicine.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div>
                                  <p className="font-semibold">{medicine.name}</p>
                                  <p className="text-sm text-gray-600">{medicine.manufacturer}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{medicine.category}</td>
                            <td className="py-3 px-4 font-semibold text-green-600">${medicine.price}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                medicine.stock < 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {medicine.stock}
                              </span>
                            </td>
                            <td className="py-3 px-4">{medicine.expiryDate}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => startEdit(medicine)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteMedicine(medicine._id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add/Edit Medicine Form */}
          {(currentView === 'add' || currentView === 'edit') && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentView === 'add' ? 'Add New Medicine' : 'Edit Medicine'}
                </h2>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {formData.imagePreview ? (
                          <img src={formData.imagePreview} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
                        ) : (
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Upload className="text-gray-400" size={32} />
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                          Choose Image
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer *</label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="prescriptionRequired"
                        checked={formData.prescriptionRequired}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Prescription Required
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentView('dashboard')}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={currentView === 'add' ? handleAddMedicine : handleEditMedicine}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>{currentView === 'add' ? 'Add Medicine' : 'Update Medicine'}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />  
    </>
  );
};

export default AdminPage;