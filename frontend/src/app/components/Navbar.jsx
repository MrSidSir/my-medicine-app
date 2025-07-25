"use client";

import { useState, useContext } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { useFetchAllMedicinesQuery } from "../../../src/redux/features/medicines/medicinesApi";
import { useLanguage } from "../../../src/context/LanguageProvider";
import { AuthContext } from "../../../src/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { currentUser, logout } = useContext(AuthContext);
  const { language, changeLanguage, t } = useLanguage();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { data: medicines = [] } = useFetchAllMedicinesQuery();
  const uniqueCategories = [...new Set(medicines.map(m => m.category))];

  const handleLanguageChange = (e) => changeLanguage(e.target.value);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-green-700 text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        <div className="flex items-center space-x-4">
          <h1
            className="text-xl font-bold cursor-pointer hover:text-yellow-300"
            onClick={() => router.push('/')}
          >
            🏥 MediStore
          </h1>
          <p className="hidden md:block">Delivering to Delhi 110001</p>
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
          className="flex flex-grow max-w-lg mx-4 bg-white rounded overflow-hidden"
        >
          <input
            type="text"
            name="search"
            placeholder="Search medicines, categories..."
            className="flex-grow px-3 py-2 text-black outline-none"
          />
          <button type="submit" className="px-4 bg-yellow-400 hover:bg-yellow-500 text-black">
            <FiSearch />
          </button>
        </form>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-green-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-green-800"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="ur">UR</option>
          </select>

          <div className="relative">
            <FiUser
              className="cursor-pointer text-xl hover:text-yellow-300"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              title={currentUser ? t('dashboard') : t('login')}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                {currentUser ? (
                  <>
                    <p className="px-4 py-2 border-b">{currentUser.email || currentUser.name}</p>
                    <button
                      onClick={() => {
                        router.push('/user-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        router.push('/login');
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-100"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        router.push('/register');
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-100"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => router.push('/orders')}
            title="Returns & Orders"
          >
            Returns & Orders
          </div>

          <FiShoppingCart
            className="cursor-pointer text-xl hover:text-yellow-300"
            onClick={() => router.push('/cart')}
            title="Cart"
          />
        </div>
      </div>

      {/* Category Menu */}
      <div className="bg-green-600 flex space-x-4 px-4 py-2 overflow-x-auto text-sm">
        <button onClick={() => router.push('/')} className="hover:text-yellow-300">All</button>
        <button onClick={() => router.push('/fresh')} className="hover:text-yellow-300">Fresh</button>
        <button onClick={() => router.push('/bestsellers')} className="hover:text-yellow-300">Bestsellers</button>
        <button onClick={() => router.push('/todaydeals')} className="hover:text-yellow-300">Today's Deals</button>
        <button onClick={() => router.push('/mobiles')} className="hover:text-yellow-300">Mobiles</button>
        <button onClick={() => router.push('/prime')} className="hover:text-yellow-300">Prime</button>
        <button onClick={() => router.push('/customer-service')} className="hover:text-yellow-300">Customer Service</button>
        <button onClick={() => router.push('/electronics')} className="hover:text-yellow-300">Electronics</button>
        <button onClick={() => router.push('/beauty')} className="hover:text-yellow-300">Beauty</button>

        {/* Dynamic Categories */}
        {uniqueCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => router.push(`/category/${cat}`)}
            className="hover:text-yellow-300"
          >
            {cat}
          </button>
        ))}
      </div>
    </nav>
  );
}
