// ✅ File: src/components/ui/Badge.jsx
import React from "react";


const Badge = ({ label, text, className = "" }) => {
  return (
    <span className={`inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium ${className}`}>
      {label || text}
    </span>
  );
};

export default Badge;
