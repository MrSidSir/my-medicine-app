"use client";

import { useState } from "react";
import axios from "axios";

export default function AddMedicinePage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    countInStock: "",
    manufacturer: "",
    prescriptionRequired: false,
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/medicines/create-medicine", formData);
      alert("Medicine added successfully!");
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        countInStock: "",
        manufacturer: "",
        prescriptionRequired: false,
        imageUrl: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding medicine");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-4">Add New Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name","category","price","description","countInStock","manufacturer","imageUrl"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        ))}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="prescriptionRequired"
            checked={formData.prescriptionRequired}
            onChange={handleChange}
          />
          <span>Prescription Required</span>
        </label>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Medicine</button>
      </form>
    </div>
  );
}
