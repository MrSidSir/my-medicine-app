"use client";
import { useState } from "react";

export default function AddMedicinePage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend POST /api/medicines
    console.log("Adding medicine:", { name, price });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Medicine</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Medicine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Medicine
        </button>
      </form>
    </div>
  );
}
