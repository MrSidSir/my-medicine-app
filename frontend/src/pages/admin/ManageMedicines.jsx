import React from 'react';
import { useFetchAllMedicinesQuery, useDeleteMedicineMutation } from '../../redux/features/medicines/medicinesApi';
import { Link } from 'react-router-dom';

const ManageMedicines = () => {
  const { data: medicines = [], isLoading } = useFetchAllMedicinesQuery();
  const [deleteMedicine] = useDeleteMedicineMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this medicine?')) {
      await deleteMedicine(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Manage Medicines</h2>
      <Link to="/admin/add-medicine" className='btn-primary mb-4 inline-block'>Add New Medicine</Link>

      <table className='w-full table-auto border'>
        <thead>
          <tr className='bg-gray-200'>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med._id} className='text-center border'>
              <td>{med.name}</td>
              <td>${med.price}</td>
              <td>{med.countInStock}</td>
              <td>{med.expiryDate || 'N/A'}</td>
              <td>
                <Link to={`/admin/edit-medicine/${med._id}`} className='text-blue-500 mr-2'>Edit</Link>
                <button onClick={() => handleDelete(med._id)} className='text-red-500'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMedicines;
