"use client";
import React from "react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/addmedicine" className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 text-center">
          ➕ Add Medicine
        </Link>
        <Link href="/admin/managemedicines" className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 text-center">
          📋 Manage Medicines
        </Link>
        <Link href="/admin/manageusers" className="bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 text-center">
          👥 Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
