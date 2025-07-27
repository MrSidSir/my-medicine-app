// ✅ File: src/pages/about/AboutMediStore.jsx
"use client";

import React from "react";
import ChatWidget from "@/app/components/common/ChatWidget";
import Button from "@/app/components/ui/Badge";
import Card from "@/app/components/ui/Card";

const AboutMediStore = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-50">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">About Medi Store</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Medi Store is your trusted partner in health, delivering quality medicines, expert advice, and a seamless healthcare experience.
        </p>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Trust & Quality", desc: "Only certified medicines from trusted manufacturers." },
          { title: "Customer First", desc: "Support and service tailored for every individual." },
          { title: "Innovation", desc: "Tech-driven solutions for better health access." },
        ].map((item, idx) => (
          <Card key={idx} className="p-6 shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </Card>
        ))}
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-100 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Dr. A Sharma", "Ritika B.", "Mohit R.", "Neha K.", "Rajveer S.", "Anjali M."].map((name, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow hover:shadow-xl transition duration-300"
              >
                <div className="h-24 w-24 mx-auto rounded-full bg-gray-200 mb-3"></div>
                <h4 className="font-semibold text-blue-800">{name}</h4>
                <p className="text-sm text-gray-500">{i % 2 === 0 ? "Pharmacist" : "Customer Care"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-white border-t">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          {[
            { label: "Products", value: "1,200+" },
            { label: "Customers", value: "75K+" },
            { label: "Cities", value: "200+" },
            { label: "Staff", value: "350+" },
          ].map((stat, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-bold text-blue-700">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-blue-700 text-white px-4">
        <h2 className="text-3xl font-bold mb-4">Your health, our mission.</h2>
        <p className="mb-6">Join thousands of customers choosing Medi Store for reliable healthcare support.</p>
        <Button className="bg-white text-blue-700 hover:bg-gray-100">Explore Products</Button>
      </section>

      {/* ChatBot */}
      <ChatWidget />
    </div>
  );
};

export default AboutMediStore;
