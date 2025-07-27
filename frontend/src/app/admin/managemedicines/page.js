// ✅ File: src/pages/admin/ManageMedicines.jsx
"use client";

import React from 'react';
import Link from 'next/link'; // ✅ Next.js Link
import { useFetchAllMedicinesQuery, useDeleteMedicineMutation } from '../../../redux/features/medicines/medicinesApi';

const ManageMedicines = () => {
  // ➡️ Fetch all medicines using RTK Query
  const { data: medicines = [], isLoading } = useFetchAllMedicinesQuery();

  // ➡️ RTK Query mutation hook for deleting medicine
  const [deleteMedicine] = useDeleteMedicineMutation();

  // ➡️ Handles medicine deletion with confirmation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this medicine?')) {
      await deleteMedicine(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className='text-2xl font-bold mb-4'>Manage Medicines</h2>
      
      {/* ➡️ Link to add new medicine */}
      <Link href="/admin/add-medicine" className='bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-700'>
        Add New Medicine
      </Link>

      <table className='w-full table-auto border'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='p-2 border'>Name</th>
            <th className='p-2 border'>Price</th>
            <th className='p-2 border'>Stock</th>
            <th className='p-2 border'>Expiry</th>
            <th className='p-2 border'>Featured</th>
            <th className='p-2 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med._id} className='text-center border'>
              <td className='p-2 border'>{med.name}</td>
              <td className='p-2 border'>${med.price}</td>
              <td className='p-2 border'>{med.stock}</td>
              <td className='p-2 border'>{med.expiryDate || 'N/A'}</td>
              <td className='p-2 border'>
                <input
                  type="checkbox"
                  checked={med.isFeatured}
                  onChange={async () => await updateMedicine({ id: med._id, isFeatured: !med.isFeatured })}
                  className="mr-2"
                  title="Toggle Featured"
                />
              </td>
              <td className='p-2 border'>
                <Link href={`/admin/edit-medicine/${med._id}`} className='text-blue-500 hover:underline mr-2'>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(med._id)}
                  className='text-red-500 hover:underline'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMedicines;
