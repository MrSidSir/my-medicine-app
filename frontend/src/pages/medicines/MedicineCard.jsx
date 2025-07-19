// src/pages/medicines/MedicineCard.jsx

import React from 'react';

const MedicineCard = ({ medicine }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{medicine.name}</h3>
      <p className="text-gray-600">{medicine.description}</p>
      <p className="text-green-600 font-semibold">₹{medicine.price}</p>
    </div>
  );
};

export default MedicineCard;
