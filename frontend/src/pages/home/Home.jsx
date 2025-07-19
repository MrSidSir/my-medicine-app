import React, { useState } from 'react';
import Navbar from '../../app/components/Navbar'; // ✅ Adjust path as per your folder
import HeroSection from './HeroSection';
import FeaturedMedicines from './FeaturedMedicines';
import Categories from './Categories';
import AllMedicines from '../medicines/AllMedicines';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Navbar /> {/* ✅ Added here */}
      <HeroSection />
      <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <FeaturedMedicines />
      <AllMedicines category={selectedCategory} />
    </>
  );
};

export default Home;
