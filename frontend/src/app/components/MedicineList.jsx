"use client";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import MedicineCard from "./MedicineCard";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get("/medicines");
        setMedicines(res.data);
      } catch (err) {
        console.error("Failed to fetch medicines", err);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {medicines.length > 0 ? (
        medicines.map((medicine) => (
          <MedicineCard key={medicine._id} medicine={medicine} />
        ))
      ) : (
        <p>No medicines available.</p>
      )}
    </div>
  );
}
