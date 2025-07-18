"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Page() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/medicines"); // adjust to your backend URL
        setMedicines(res.data);
      } catch (err) {
        console.error("Error fetching medicines:", err);
      }
    };
    fetchMedicines();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Sellers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-md transition"
          >
            <Image
              src={medicine.image}
              alt={medicine.name}
              width={150}
              height={150}
              className="object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2 text-center">
              {medicine.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1 text-center">
              {medicine.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-600 font-bold">
                ₹{medicine.discountPrice}
              </span>
              <span className="line-through text-gray-400">
                ₹{medicine.price}
              </span>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded mt-3 w-full">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
