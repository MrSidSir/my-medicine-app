"use client";
import { useState, useEffect, useContext } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { useFetchAllMedicinesQuery } from "../../../src/redux/features/medicines/medicinesApi";
import { LanguageContext } from "../../context/LanguageProvider";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function Navbar() {
  const router = useRouter();
  const { currentUser, logout } = useContext(AuthContext);
  const { language, changeLanguage } = useContext(LanguageContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Fetch dynamic medicine categories
  const { data: medicines = [] } = useFetchAllMedicinesQuery();
  const uniqueCategories = [...new Set(medicines.map(m => m.category))];

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    changeLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-400 text-white">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <p>📦 Free delivery for orders above ₹500</p>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-green-700 text-white px-2 py-1 rounded"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ur">Urdu</option>
        </select>
      </div>

      {/* Main navbar */}
      <div className="flex justify-between items-center px-4 py-3 bg-green-700">
        <div className="flex items-center space-x-4">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push('/')}
          >
            🏥 MediStore
          </h1>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <button onClick={() => router.push('/')} className="hover:text-yellow-300">Home</button>
            <button onClick={() => router.push('/about')} className="hover:text-yellow-300">About</button>
            <button onClick={() => router.push('/contact')} className="hover:text-yellow-300">Contact</button>
            <div className="relative group">
              <button className="hover:text-yellow-300">Categories ▾</button>
              <div className="absolute bg-white text-black shadow rounded hidden group-hover:block mt-1 z-50">
                {uniqueCategories.length > 0 ? (
                  uniqueCategories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => router.push(`/category/${cat}`)}
                      className="block px-4 py-2 hover:bg-green-100 w-full text-left"
                    >
                      {cat}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-2">Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search?q=${e.target.search.value}`);
            }}
            className="hidden md:flex bg-green-600 rounded px-2 py-1"
          >
            <input
              type="text"
              name="search"
              placeholder="Search medicines..."
              className="bg-transparent outline-none text-white px-2"
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>

          <FiHeart
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => router.push('/wishlist')}
          />
          <FiShoppingCart
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => router.push('/cart')}
          />

          {/* User icon or Google login */}
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <FiUser
                className="cursor-pointer hover:text-yellow-300"
                onClick={() => router.push('/user-dashboard')}
              />
              <BiLogOut
                className="cursor-pointer hover:text-yellow-300"
                onClick={handleLogout}
              />
            </div>
          ) : (
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
                // Handle Google auth logic here
              }}
              onError={() => {
                console.log("Google login failed");
              }}
            />
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-600 px-4 py-2 space-y-2">
          <button onClick={() => router.push('/')} className="block w-full text-left hover:text-yellow-300">Home</button>
          <button onClick={() => router.push('/about')} className="block w-full text-left hover:text-yellow-300">About</button>
          <button onClick={() => router.push('/contact')} className="block w-full text-left hover:text-yellow-300">Contact</button>
          <div>
            <p className="font-semibold">Categories</p>
            {uniqueCategories.length > 0 ? (
              uniqueCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push(`/category/${cat}`)}
                  className="block w-full text-left hover:text-yellow-300"
                >
                  {cat}
                </button>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          {!currentUser && (
            <button onClick={() => router.push('/login')} className="block w-full text-left hover:text-yellow-300">Login / Register</button>
          )}
        </div>
      )}
    </nav>
  );
}
