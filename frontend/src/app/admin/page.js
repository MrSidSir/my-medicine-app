// ✅ File: src/app/admin/page.js

"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminPage = () => {
  return (
    <>
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-4 py-10 font-primary">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <p className="text-center mb-10 text-gray-600">
          Welcome to your admin portal. Manage your medicines efficiently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/addmedicine"
            className="block bg-green-600 text-white rounded-lg shadow p-6 text-center hover:bg-green-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Add Medicine</h2>
            <p>Add new medicines to your database.</p>
          </Link>

          <Link
            href="/admin/managemedicines"
            className="block bg-blue-600 text-white rounded-lg shadow p-6 text-center hover:bg-blue-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Medicines</h2>
            <p>View, edit, or delete medicines.</p>
          </Link>

          <Link
            href="/admin/editmedicine"
            className="block bg-yellow-600 text-white rounded-lg shadow p-6 text-center hover:bg-yellow-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Edit Medicine</h2>
            <p>Edit existing medicine details.</p>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminPage;
