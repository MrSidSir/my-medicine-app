"use client";

import { useState, useContext, useEffect } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiSettings, FiShield, FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useFetchAllMedicinesQuery } from "../../../src/redux/features/medicines/medicinesApi";
import { useLanguage } from "../../../src/context/LanguageProvider";
import { AuthContext } from "../../../src/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { currentUser, logout, loginWithGoogle, isAdmin } = useContext(AuthContext);
  const { language, changeLanguage, t } = useLanguage();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: medicines = [] } = useFetchAllMedicinesQuery();
  const uniqueCategories = [...new Set(medicines.map(m => m.category))];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (e) => changeLanguage(e.target.value);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setIsUserMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Google login error:', error);
      alert('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (path) => {
    setIsUserMenuOpen(false);
    router.push(path);
  };

  // Check if user is admin (you can customize this logic based on your user structure)
  const checkIsAdmin = () => {
    if (!currentUser) return false;
    return currentUser.role === 'admin' || currentUser.isAdmin || isAdmin;
  };

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-40">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        <div className="flex items-center space-x-4">
          <h1
            className="text-xl font-bold cursor-pointer hover:text-yellow-300 transition-colors"
            onClick={() => router.push('/')}
          >
            🏥 MediStore
          </h1>
          <p className="hidden md:block text-green-200">Delivering to Delhi 110001</p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const searchValue = e.target.search.value.trim();
            if (searchValue) {
              router.push(`/search?q=${encodeURIComponent(searchValue)}`);
            }
          }}
          className="flex flex-grow max-w-lg mx-4 bg-white rounded overflow-hidden shadow-sm"
        >
          <input
            type="text"
            name="search"
            placeholder="Search medicines, categories..."
            className="flex-grow px-3 py-2 text-black outline-none"
          />
          <button 
            type="submit" 
            className="px-4 bg-yellow-400 hover:bg-yellow-500 text-black transition-colors"
          >
            <FiSearch />
          </button>
        </form>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-green-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-green-800 transition-colors"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="ur">UR</option>
          </select>

          {/* User Menu */}
          <div className="relative user-menu-container">
            <div 
              className="flex items-center space-x-1 cursor-pointer hover:text-yellow-300 transition-colors p-1 rounded hover:bg-green-600"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <FiUser className="text-xl" />
              {currentUser && (
                <span className="hidden md:block text-sm">
                  {currentUser.displayName || currentUser.name || 'User'}
                </span>
              )}
            </div>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-xl border z-50 overflow-hidden">
                {currentUser ? (
                  <>
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <div className="flex items-center space-x-3">
                        {currentUser.photoURL ? (
                          <img 
                            src={currentUser.photoURL} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                            {(currentUser.displayName || currentUser.name || currentUser.email || 'U')[0].toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {currentUser.displayName || currentUser.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {currentUser.email}
                          </p>
                          {checkIsAdmin() && (
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mt-1">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => handleNavigation('/user-dashboard')}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:bg-green-50 transition-colors"
                      >
                        <FiUser className="text-green-600" />
                        <span>Dashboard</span>
                      </button>

                      <button
                        onClick={() => handleNavigation('/profile')}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:bg-green-50 transition-colors"
                      >
                        <FiSettings className="text-green-600" />
                        <span>Profile Settings</span>
                      </button>

                      <button
                        onClick={() => handleNavigation('/orders')}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:bg-green-50 transition-colors"
                      >
                        <FiShoppingCart className="text-green-600" />
                        <span>My Orders</span>
                      </button>

                      {/* Admin Menu - Only show if user is admin */}
                      {checkIsAdmin() && (
                        <>
                          <div className="border-t my-2"></div>
                          <div className="px-4 py-1">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              Admin Panel
                            </p>
                          </div>
                          <button
                            onClick={() => handleNavigation('/admin')}
                            className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:bg-red-50 transition-colors"
                          >
                            <FiShield className="text-red-600" />
                            <span className="text-red-700 font-medium">Admin Dashboard</span>
                          </button>
                          <button
                            onClick={() => handleNavigation('/admin/users')}
                            className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:bg-red-50 transition-colors"
                          >
                            <FiUser className="text-red-600" />
                            <span className="text-red-700">Manage Users</span>
                          </button>
                        </>
                      )}

                      <div className="border-t my-2"></div>
                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <FiLogOut />
                        <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Not Logged In */}
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-600 border-b bg-gray-50">
                        Welcome to MediStore
                      </div>
                      
                      {/* Admin Access */}
                      <button
                        onClick={() => handleNavigation('/admin')}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:bg-red-50 transition-colors"
                      >
                        <FiShield className="text-red-600" />
                        <span className="text-red-700 font-medium">Admin Panel</span>
                      </button>
                      
                      <div className="border-t my-1"></div>
                      
                      {/* User Login */}
                      <button
                        onClick={() => handleNavigation('/login')}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:bg-green-50 transition-colors"
                      >
                        <FiLogIn className="text-green-600" />
                        <span>User Login</span>
                      </button>
                      
                      {/* User SignUp */}
                      <button
                        onClick={() => handleNavigation('/signup')}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:bg-green-50 transition-colors"
                      >
                        <FiUserPlus className="text-green-600" />
                        <span>User SignUp</span>
                      </button>
                      
                      <div className="border-t my-1"></div>
                      
                      {/* Login with Google */}
                      <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="flex items-center space-x-3 w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors disabled:opacity-50"
                      >
                        <FaGoogle className="text-red-500" />
                        <span className="text-blue-700 font-medium">
                          {isLoading ? 'Signing in...' : 'Login with Google'}
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <div
            className="cursor-pointer hover:text-yellow-300 transition-colors hidden md:block"
            onClick={() => router.push('/orders')}
            title="Returns & Orders"
          >
            Returns & Orders
          </div>

          {/* Cart */}
          <div className="relative">
            <FiShoppingCart
              className="cursor-pointer text-xl hover:text-yellow-300 transition-colors"
              onClick={() => router.push('/cart')}
              title="Cart"
            />
            {/* You can add cart count badge here */}
            {/* <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span> */}
          </div>
        </div>
      </div>

      {/* Category Menu */}
      <div className="bg-green-600 flex space-x-4 px-4 py-2 overflow-x-auto text-sm">
        <button 
          onClick={() => router.push('/')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          All
        </button>
        <button 
          onClick={() => router.push('/fresh')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          Fresh
        </button>
        <button 
          onClick={() => router.push('/bestsellers')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          Bestsellers
        </button>
        <button 
          onClick={() => router.push('/todaydeals')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          Today's Deals
        </button>
        <button 
          onClick={() => router.push('/mobiles')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          Mobiles
        </button>
        <button 
          onClick={() => router.push('/prime')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          Prime
        </button>
        <button 
          onClick={() => router.push('/customer-service')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          Customer Service
        </button>
        <button 
          onClick={() => router.push('/electronics')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          Electronics
        </button>
        <button 
          onClick={() => router.push('/beauty')} 
          className="hover:text-yellow-300 transition-colors whitespace-nowrap"
        >
          Beauty
        </button>

        {/* Dynamic Categories */}
        {uniqueCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => router.push(`/category/${cat}`)}
            className="hover:text-yellow-300 transition-colors whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </div>
    </nav>
  );
}