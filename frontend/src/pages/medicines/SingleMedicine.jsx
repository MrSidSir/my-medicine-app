import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchMedicineByIdQuery } from '../../redux/features/medicines/medicinesApi';

const SingleMedicine = () => {
  const { id } = useParams();
  const { data: medicine, isLoading, isError } = useFetchMedicineByIdQuery(id);

  if (isLoading) return <div>Loading medicine details...</div>;
  if (isError) return <div>Error loading medicine data.</div>;

  return (
    <div className='max-w-lg shadow-md p-5'>
      <h1 className='text-2xl font-bold mb-6'>{medicine.name}</h1>
      <p className="text-gray-700 mb-2"><strong>Category:</strong> {medicine.category}</p>
      <p className="text-gray-700 mb-4"><strong>Price:</strong> ₹{medicine.price}</p>
      <p className="text-gray-700 mb-4"><strong>Description:</strong> {medicine.description}</p>
    </div>
  );
};

export default SingleMedicine;
