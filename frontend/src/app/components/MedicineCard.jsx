"use client";
import Image from "next/image";

export default function MedicineCard({ medicine }) {
  return (
    <div className="border rounded shadow p-2 hover:shadow-md">
      <Image
        src={medicine.image}
        alt={medicine.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <h2 className="text-center text-lg mt-2">{medicine.name}</h2>
      <p className="text-center text-green-600 font-bold">₹ {medicine.price}</p>
      <button className="bg-green-500 text-white w-full py-1 mt-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}
