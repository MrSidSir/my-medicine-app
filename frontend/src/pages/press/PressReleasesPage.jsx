// src/pages/press/PressReleasesPage.jsx
import React from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const mockPressReleases = [
  {
    id: 1,
    title: "MediStore Launches New Pharmacy App",
    date: "2025-07-01",
    category: "Technology",
  },
  {
    id: 2,
    title: "Awarded Healthcare Excellence 2025",
    date: "2025-06-20",
    category: "Achievement",
  },
];

const PressReleasesPage = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Press Releases</h2>
      {mockPressReleases.map((release) => (
        <Card key={release.id}>
          <h3 className="text-xl font-semibold">{release.title}</h3>
          <p className="text-gray-500 text-sm">{release.date}</p>
          <Badge text={release.category} />
        </Card>
      ))}
    </div>
  );
};

export default PressReleasesPage;
