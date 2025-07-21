"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="space-y-4">
        <Link href="/admin/addmedicine">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Add Medicine</button>
        </Link>

        <Link href="/admin/viewmedicines">
          <button className="bg-blue-600 text-white px-4 py-2 rounded ml-4">View Medicines</button>
        </Link>
      </div>
    </div>
  );
}
