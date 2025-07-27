// src/pages/research/ResearchDetail.jsx
import React from "react";
import Card from "../../components/ui/Card";

const ResearchDetail = ({ title, content, leadResearcher, date }) => {
  return (
    <div className="p-6">
      <Card>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500 text-sm mb-4">
          Lead: {leadResearcher} | {date}
        </p>
        <p className="text-gray-700">{content}</p>
      </Card>
    </div>
  );
};

ResearchDetail.defaultProps = {
  title: "New Vaccine Research in Progress",
  content:
    "Our latest research aims at building a stronger vaccine for seasonal infections using mRNA technology...",
  leadResearcher: "Dr. Ayesha Khan",
  date: "2025-06-15",
};

export default ResearchDetail;
