  "use client";

  import React, { useState } from 'react';
  import Navbar from "../app/components/Navbar";
  import Footer from "../app/components/Footer";
  import Products from "../app/components/Products";
  import HeroSection from "../pages/home/HeroSection";
  import Categories from "../pages/home/Categories";
  import FeaturedMedicines from "../pages/home/FeaturedMedicines";
  import AllMedicines from "../pages/medicines/AllMedicines";

  const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
      <>
        <Navbar />

        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          {/* Hero Section */}
          <HeroSection />

          {/* Categories Section */}
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Featured Medicines Section */}
          <FeaturedMedicines />

          {/* All Medicines Section */}
          <AllMedicines category={selectedCategory} />

          {/* Amazon-like Products Section */}
          <Products />
        </main>

        <Footer />
      </>
    );
  };

  export default HomePage;
