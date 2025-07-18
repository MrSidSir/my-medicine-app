// src/pages/admin/EditMedicine.jsx

import React, { useState, useEffect } from 'react';
import { useFetchMedicineByIdQuery, useUpdateMedicineMutation } from '../../redux/features/medicines/medicinesApi';
import { useNavigate, useParams } from 'react-router-dom';

const EditMedicine = () => {
  const { id } = useParams();
  const { data: medicine, isLoading: loadingMedicine } = useFetchMedicineByIdQuery(id);
  const [updateMedicine, { isLoading: updating }] = useUpdateMedicineMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    countInStock: '',
    manufacturer: '',
    expiryDate: '',
    prescriptionRequired: false,
  });

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name,
        category: medicine.category,
        price: medicine.price,
        description: medicine.description,
        countInStock: medicine.countInStock,
        manufacturer: medicine.manufacturer,
        expiryDate: medicine.expiryDate || '',
        prescriptionRequired: medicine.prescriptionRequired,
      });
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMedicine({ id, ...formData });
    navigate('/admin/manage-medicines');
  };

  if (loadingMedicine) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-4 shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Medicine</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "category", "price", "description", "countInStock", "manufacturer", "expiryDate"].map((field) => (
          <div key={field}>
            <label className="block capitalize">{field}</label>
            <input
              type={field === "price" || field === "countInStock" ? "number" : "text"}
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

        <button type="submit" className="btn-primary w-full" disabled={updating}>
          {updating ? "Updating..." : "Update Medicine"}
        </button>
      </form>
    </div>
  );
};

export default EditMedicine;
