import React from 'react';

const categories = ["All", "Pain Relief", "Diabetes Care", "Cardiology", "Skin Care"];

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Shop by Category</h2>
      <div className="flex gap-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
