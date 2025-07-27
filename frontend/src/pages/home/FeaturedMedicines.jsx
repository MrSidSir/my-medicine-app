import React from 'react';
import { useGetFeaturedMedicinesQuery } from '../../redux/features/medicines/medicinesApi';
import MedicineCard from '../medicines/MedicineCard';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const FeaturedMedicines = () => {
  const { data: featured = [], isLoading } = useGetFeaturedMedicinesQuery();
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser && (currentUser.isAdmin || currentUser.role === 'admin');

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Featured Medicines</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {featured.map((medicine) => (
          <MedicineCard key={medicine._id} medicine={medicine} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedMedicines;
