// src/pages/press/PressDetail.jsx
import React from "react";
import Card from "../../components/ui/Card";

const PressDetail = ({ title, content, author, date }) => {
  return (
    <div className="p-6">
      <Card>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">By {author} | {date}</p>
        <p className="text-gray-800">{content}</p>
      </Card>
    </div>
  );
};

// Example usage with dummy props for dev/test
PressDetail.defaultProps = {
  title: "Big Announcement from MediStore",
  content: "MediStore has announced a new line of AI-integrated health solutions...",
  author: "John Doe",
  date: "2025-07-20",
};

export default PressDetail;
