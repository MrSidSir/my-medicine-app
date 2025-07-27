// src/pages/research/ResearchOverview.jsx
import React from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const researchHighlights = [
  {
    id: 1,
    title: "Advancing Pharma with AI",
    summary: "Exploring how AI helps in drug discovery and pharmacy automation.",
    category: "AI",
  },
  {
    id: 2,
    title: "Impact of Natural Remedies",
    summary: "Ongoing study on integrating Ayurveda in modern medicine.",
    category: "Herbal",
  },
];

const ResearchOverview = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Research Highlights</h2>
      {researchHighlights.map((item) => (
        <Card key={item.id}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <Badge text={item.category} />
          </div>
          <p className="text-gray-600">{item.summary}</p>
        </Card>
      ))}
    </div>
  );
};

export default ResearchOverview;
