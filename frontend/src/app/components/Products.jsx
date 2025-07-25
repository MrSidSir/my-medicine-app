"use client";

import { medicines } from "../data/medicines";

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Medicines</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((med) => (
          <div
            key={med.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-white"
          >
            <img
              src={med.image}
              alt={med.name}
              className="w-full h-40 object-contain p-4"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{med.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{med.details}</p>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-700 font-bold">₹{med.price}</span>
                <span className="line-through text-gray-400">₹{med.mrp}</span>
                <span className="text-red-600">{med.discount}</span>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
