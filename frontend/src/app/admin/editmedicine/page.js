"use client"; // add at top for client-side hook usage

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFetchMedicineByIdQuery, useUpdateMedicineMutation } from '@/redux/features/medicines/medicinesApi';

const EditMedicine = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useFetchMedicineByIdQuery(id);
  const [updateMedicine] = useUpdateMedicineMutation();

  const handleUpdate = async () => {
    await updateMedicine({ id, /* other fields */ });
    router.push('/admin/managemedicines'); // navigate after update
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching medicine.</div>;

  return (
    <div>
      <h1>Edit Medicine</h1>
      {/* form here */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditMedicine;
