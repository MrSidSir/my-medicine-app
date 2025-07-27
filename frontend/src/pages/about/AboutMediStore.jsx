// ✅ File: src/pages/about/AboutMediStore.jsx
"use client";

import React from "react";
import ChatWidget from "@/app/components/common/ChatWidget";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";

const AboutMediStore = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-900 text-white shadow-lg rounded-b-3xl mb-10">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">About Medi Store</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Medi Store is your trusted partner in health, delivering quality medicines, expert advice, and a seamless healthcare experience.
        </p>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: "Trust & Quality", desc: "Only certified medicines from trusted manufacturers." },
          { title: "Customer First", desc: "Support and service tailored for every individual." },
          { title: "Innovation", desc: "Tech-driven solutions for better health access." },
        ].map((item, idx) => (
          <Card key={idx} className="p-8 shadow-xl hover:shadow-2xl transition-all border-t-4 border-blue-400 bg-white">
            <h3 className="text-2xl font-bold text-blue-800 mb-3">{item.title}</h3>
            <p className="text-gray-600 text-base">{item.desc}</p>
          </Card>
        ))}
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-100 px-4 rounded-xl mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Dr. A Sharma", "Ritika B.", "Mohit R.", "Neha K.", "Rajveer S.", "Anjali M."].map((name, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition duration-300 border border-blue-200"
              >
                <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-blue-200 to-blue-400 mb-4 flex items-center justify-center text-2xl font-bold text-blue-900">
                  {name.split(' ')[0][0]}
                </div>
                <h4 className="font-semibold text-blue-800 text-lg">{name}</h4>
                <p className="text-sm text-gray-500">{i % 2 === 0 ? "Pharmacist" : "Customer Care"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-white border-t border-b mb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-10">
          {[
            { label: "Products", value: "1,200+" },
            { label: "Customers", value: "75K+" },
            { label: "Cities", value: "200+" },
            { label: "Staff", value: "350+" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl py-6 shadow-md">
              <h3 className="text-3xl font-extrabold text-blue-700 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-blue-700 text-white px-4 rounded-2xl shadow-xl mb-10">
        <h2 className="text-4xl font-bold mb-4">Your health, our mission.</h2>
        <p className="mb-8 text-lg">Join thousands of customers choosing Medi Store for reliable healthcare support.</p>
        <Button className="bg-white text-blue-700 hover:bg-blue-100 font-bold px-8 py-3 text-lg rounded-full shadow-lg">Explore Products</Button>
      </section>

      {/* ChatBot */}
      <ChatWidget />
    </div>
  );
};

export default AboutMediStore;
