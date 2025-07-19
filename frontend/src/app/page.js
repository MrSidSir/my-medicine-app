// frontend/app/page.js

"use client";

import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import HeroSection from "../pages/home/HeroSection";
import Categories from "../pages/home/Categories";
import FeaturedMedicines from "../pages/home/FeaturedMedicines";
import AllMedicines from "../pages/medicines/AllMedicines";
import React, { createContext, useState, useEffect } from 'react';
const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Navbar />

      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <HeroSection />

        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FeaturedMedicines />

        <AllMedicines category={selectedCategory} />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
