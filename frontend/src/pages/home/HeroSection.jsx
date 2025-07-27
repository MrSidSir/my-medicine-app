"use client";

import { useRouter } from 'next/navigation'; // ✅ correct for app directory
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  const router = useRouter();

  const handleShopNow = () => {
    router.push('/medicines');
  };

  return (
    <section className="flex flex-col md:flex-row-reverse py-16 px-4 md:px-16 justify-between items-center gap-12 bg-gray-50">
      {/* Right Side Image */}
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <div className="relative w-full h-64 md:h-96">
          <Image 
            src="/assets/pharmacy-hero.png"
            alt="Pharmacy Hero"
            fill
            className="rounded-lg shadow-lg object-contain"
          />
        </div>
      </div>

      {/* Left Side Text */}
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-3xl font-semibold mb-6 text-gray-800">
          Your Trusted Online Pharmacy
        </h1>
        <p className="mb-8 text-gray-600">
          Order medicines, health supplements, and healthcare products online with ease and fast delivery.
        </p>
        <button 
          onClick={handleShopNow}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition duration-300"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
