"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex flex-col md:flex-row justify-between items-center">
      <Link href="/">
        <h1 className="font-bold text-xl">MyMedicineApp</h1>
      </Link>
      <div className="space-x-4 mt-2 md:mt-0">
        <Link href="/cart">Cart</Link>
        <Link href="/admin/addmedicine">Admin</Link>
      </div>
    </nav>
  );
}
