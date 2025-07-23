"use client";

import { useState, useContext } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { useFetchAllMedicinesQuery } from "../../../src/redux/features/medicines/medicinesApi";
import { useLanguage } from "../../../src/context/LanguageProvider";
import { AuthContext } from "../../../src/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function Navbar() {
  const router = useRouter();
  const { currentUser, logout } = useContext(AuthContext);
  const { language, changeLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { data: medicines = [] } = useFetchAllMedicinesQuery();
  const uniqueCategories = [...new Set(medicines.map(m => m.category))];

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-400 text-white">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <p>{t('freeDelivery')}</p>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-green-700 text-white px-2 py-1 rounded cursor-pointer hover:bg-green-800 transition-colors"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ur">اردو</option>
        </select>
      </div>

      {/* Main navbar */}
      <div className="flex justify-between items-center px-4 py-3 bg-green-700">
        <div className="flex items-center space-x-4">
          <h1
            className="text-xl font-bold cursor-pointer hover:text-yellow-300 transition-colors"
            onClick={() => router.push('/')}
          >
            🏥 MediStore
          </h1>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <button 
              onClick={() => router.push('/')} 
              className="hover:text-yellow-300 transition-colors px-2 py-1 rounded hover:bg-green-600"
            >
              {t('home')}
            </button>
            <button 
              onClick={() => router.push('/about')} 
              className="hover:text-yellow-300 transition-colors px-2 py-1 rounded hover:bg-green-600"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => router.push('/contact')} 
              className="hover:text-yellow-300 transition-colors px-2 py-1 rounded hover:bg-green-600"
            >
              {t('contact')}
            </button>
            <div className="relative group">
              <button className="hover:text-yellow-300 transition-colors px-2 py-1 rounded hover:bg-green-600">
                {t('categories')} ▾
              </button>
              <div className="absolute bg-white text-black shadow-lg rounded hidden group-hover:block mt-1 z-50 min-w-[200px]">
                {uniqueCategories.length > 0 ? (
                  uniqueCategories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => router.push(`/category/${cat}`)}
                      className="block px-4 py-2 hover:bg-green-100 w-full text-left transition-colors"
                    >
                      {cat}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">{t('loading')}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const searchValue = e.target.search.value.trim();
              if (searchValue) {
                router.push(`/search?q=${encodeURIComponent(searchValue)}`);
              }
            }}
            className="hidden md:flex bg-green-600 rounded px-2 py-1 hover:bg-green-500 transition-colors"
          >
            <input
              type="text"
              name="search"
              placeholder={t('searchPlaceholder')}
              className="bg-transparent outline-none text-white px-2 placeholder-green-200"
            />
            <button type="submit" className="hover:text-yellow-300 transition-colors">
              <FiSearch />
            </button>
          </form>

          {/* Icons */}
          <FiHeart
            className="cursor-pointer hover:text-yellow-300 transition-colors text-xl"
            onClick={() => router.push('/wishlist')}
            title={t('wishlist') || 'Wishlist'}
          />
          <FiShoppingCart
            className="cursor-pointer hover:text-yellow-300 transition-colors text-xl"
            onClick={() => router.push('/cart')}
            title={t('cart') || 'Cart'}
          />

          {/* User/Admin Dropdown */}
          <div className="relative">
            <FiUser
              className="cursor-pointer hover:text-yellow-300 transition-colors text-xl"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              title={currentUser ? t('dashboard') : t('login')}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 bg-white text-black rounded-lg shadow-lg mt-2 z-50 w-48 border">
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                      <p className="text-sm text-gray-600 truncate">
                        {currentUser.email || currentUser.name}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        router.push('/user-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-100 transition-colors"
                    >
                      {t('dashboard')}
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition-colors"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        router.push('/login');
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-100 transition-colors"
                    >
                      {t('login')}
                    </button>
                    <button
                      onClick={() => {
                        router.push('/register');
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-100 transition-colors"
                    >
                      {t('signUp')}
                    </button>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <GoogleLogin
                        onSuccess={credentialResponse => {
                          console.log(credentialResponse);
                          setIsUserMenuOpen(false);
                          // Handle Google auth logic here
                        }}
                        onError={() => {
                          console.log("Google login failed");
                        }}
                        size="medium"
                        width="100%"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-xl hover:text-yellow-300 transition-colors"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-600 px-4 py-2 space-y-2 border-t border-green-500">
          {/* Mobile Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const searchValue = e.target.mobileSearch.value.trim();
              if (searchValue) {
                router.push(`/search?q=${encodeURIComponent(searchValue)}`);
                setIsMenuOpen(false);
              }
            }}
            className="flex bg-green-500 rounded px-2 py-2 mb-3"
          >
            <input
              type="text"
              name="mobileSearch"
              placeholder={t('searchPlaceholder')}
              className="bg-transparent outline-none text-white px-2 placeholder-green-200 flex-1"
            />
            <button type="submit" className="hover:text-yellow-300 transition-colors">
              <FiSearch />
            </button>
          </form>

          <button 
            onClick={() => {
              router.push('/');
              setIsMenuOpen(false);
            }} 
            className="block w-full text-left hover:text-yellow-300 transition-colors py-2 px-2 rounded hover:bg-green-500"
          >
            {t('home')}
          </button>
          <button 
            onClick={() => {
              router.push('/about');
              setIsMenuOpen(false);
            }} 
            className="block w-full text-left hover:text-yellow-300 transition-colors py-2 px-2 rounded hover:bg-green-500"
          >
            {t('about')}
          </button>
          <button 
            onClick={() => {
              router.push('/contact');
              setIsMenuOpen(false);
            }} 
            className="block w-full text-left hover:text-yellow-300 transition-colors py-2 px-2 rounded hover:bg-green-500"
          >
            {t('contact')}
          </button>
          
          {/* Mobile Categories */}
          <div className="py-2">
            <p className="font-semibold text-yellow-300 mb-2">{t('categories')}</p>
            <div className="pl-4 space-y-1">
              {uniqueCategories.length > 0 ? (
                uniqueCategories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      router.push(`/category/${cat}`);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left hover:text-yellow-300 transition-colors py-1 px-2 rounded hover:bg-green-500"
                  >
                    {cat}
                  </button>
                ))
              ) : (
                <p className="text-green-200">{t('loading')}</p>
              )}
            </div>
          </div>

          {/* Mobile Auth Options */}
          {!currentUser && (
            <div className="border-t border-green-500 pt-2 mt-2">
              <button 
                onClick={() => {
                  router.push('/login');
                  setIsMenuOpen(false);
                }} 
                className="block w-full text-left hover:text-yellow-300 transition-colors py-2 px-2 rounded hover:bg-green-500"
              >
                {t('login')}
              </button>
              <button 
                onClick={() => {
                  router.push('/register');
                  setIsMenuOpen(false);
                }} 
                className="block w-full text-left hover:text-yellow-300 transition-colors py-2 px-2 rounded hover:bg-green-500"
              >
                {t('signUp')}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}