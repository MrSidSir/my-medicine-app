import React from 'react';
import { useFetchAllMedicinesQuery } from '../../redux/features/medicines/medicinesApi';

const AllMedicines = () => {
  const { data: medicines = [], isLoading, isError } = useFetchAllMedicinesQuery();

  if (isLoading) return <div>Loading medicines...</div>;
  if (isError) return <div>Error fetching medicines data.</div>;

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl font-semibold mb-4'>All Medicines</h2>
      {medicines.length === 0 ? (
        <div>No medicines found!</div>
      ) : (
        medicines.map((med, index) => (
          <div key={med._id} className="border-b mb-4 pb-4">
            <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
            <h2 className="font-bold">{med.name}</h2>
            <p className="text-gray-600">Price: ₹{med.price}</p>
            <p className="text-gray-600">Category: {med.category}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllMedicines;
