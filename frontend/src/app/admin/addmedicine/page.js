"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddMedicineMutation } from "../../../redux/features/medicines/medicinesApi";

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    manufacturer: "",
    expiryDate: "",
    prescriptionRequired: false,
  });

  const router = useRouter();
  const [addMedicine, { isLoading }] = useAddMedicineMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMedicine(formData);
    router.push("/admin/managemedicines");
  };

  return (
    <div className="max-w-lg mx-auto p-4 shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Medicine</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "category", "price", "description", "stock", "manufacturer", "expiryDate"].map((field) => (
          <div key={field}>
            <label className="block capitalize">{field}</label>
            <input
              type={field === "price" || field === "stock" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
              required
            />
          </div>
        ))}

        <div className="flex items-center">
          <input
            type="checkbox"
            name="prescriptionRequired"
            checked={formData.prescriptionRequired}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Prescription Required</label>
        </div>

        <button type="submit" className="btn-primary w-full" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Medicine"}
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
