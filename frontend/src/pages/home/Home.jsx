import React, { useState } from 'react';
import HeroSection from './HeroSection';
import FeaturedMedicines from './FeaturedMedicines';
import Categories from './Categories';
import AllMedicines from '../medicines/AllMedicines';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <HeroSection />
      <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <FeaturedMedicines />
      <AllMedicines category={selectedCategory} />
    </>
  );
};

export default Home;
