// src/pages/medicines/MedicineCard.jsx

import React from 'react';

const MedicineCard = ({ medicine, isAdmin }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold flex items-center">
        {medicine.name}
        {medicine.isFeatured && (
          <span className="ml-2 px-2 py-0.5 bg-yellow-300 text-yellow-900 text-xs rounded-full">Featured</span>
        )}
      </h3>
      <p className="text-gray-600">{medicine.description}</p>
      <p className="text-green-600 font-semibold">₹{medicine.price}</p>
    </div>
  );
};

export default MedicineCard;
