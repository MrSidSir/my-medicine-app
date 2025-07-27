"use client"; // add at top for client-side hook usage

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFetchMedicineByIdQuery, useUpdateMedicineMutation } from '@/redux/features/medicines/medicinesApi';

const EditMedicine = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useFetchMedicineByIdQuery(id);
  const [updateMedicine] = useUpdateMedicineMutation();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: '',
    manufacturer: '',
    expiryDate: '',
    prescriptionRequired: false,
    isFeatured: false,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        category: data.category || '',
        price: data.price || '',
        description: data.description || '',
        stock: data.stock || '',
        manufacturer: data.manufacturer || '',
        expiryDate: data.expiryDate || '',
        prescriptionRequired: data.prescriptionRequired || false,
        isFeatured: data.isFeatured || false,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateMedicine({ id, ...formData });
    router.push('/admin/managemedicines');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching medicine.</div>;

  return (
    <div className="max-w-lg mx-auto p-4 shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Medicine</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* ...other fields... */}
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
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Featured</label>
        </div>
        <button type="submit" className="btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default EditMedicine;
