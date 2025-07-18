import React from 'react';
import heroImg from '../../assets/pharmacy-hero.png'; // ✅ use your pharmacy hero image

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={heroImg} alt="Pharmacy Hero" className="rounded-lg shadow-md"/>
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-semibold mb-7">
          Your Trusted Online Pharmacy
        </h1>
        <p className="mb-10 text-gray-600">
          Order medicines, health supplements, and healthcare products online with ease and fast delivery.
        </p>
        <button className="btn-primary">Shop Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
