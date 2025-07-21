"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewMedicinesPage() {
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    const res = await axios.get("http://localhost:5000/api/medicines");
    setMedicines(res.data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to delete?")){
      await axios.delete(`http://localhost:5000/api/medicines/${id}`);
      fetchMedicines();
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-4">All Medicines</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map(med => (
            <tr key={med._id}>
              <td className="border px-2 py-1">{med.name}</td>
              <td className="border px-2 py-1">{med.price}</td>
              <td className="border px-2 py-1">{med.category}</td>
              <td className="border px-2 py-1">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(med._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
