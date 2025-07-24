import React, { useState } from "react";

export default function FilterBar({
  categories,
  categoryFilter,
  setCategoryFilter,
  ratingFilter,
  setRatingFilter,
  sortOrder,
  setSortOrder,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div className="top-0 bg-white p-2 z-10 flex gap-2 items-center flex-wrap">
      <div className="relative" tabIndex={0}>
        <button
          className="border p-2 rounded w-[180px] bg-white text-left"
          onClick={toggleDropdown}
          type="button"
        >
          {categoryFilter
            ? categories.find((c) => c.slug === categoryFilter)?.name
            : "All Categories"}
        </button>
        {showDropdown && (
          <div className="absolute mt-1 border rounded bg-white shadow-lg z-20 w-[180px] max-h-[220px] overflow-y-auto">
            <div
              className="cursor-pointer px-2 py-1 hover:bg-gray-100"
              onClick={() => {
                setCategoryFilter("");
                setShowDropdown(false);
              }}
            >
              All Categories
            </div>
            {categories.map((category) => (
              <div
                key={category.slug}
                className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                onClick={() => {
                  setCategoryFilter(category.slug);
                  setShowDropdown(false);
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <select
        value={ratingFilter || ""}
        onChange={(e) => setRatingFilter(Number(e.target.value))}
        className="border p-2 rounded"
      >
        <option value="">All Ratings</option>
        <option value="4">4 & up</option>
        <option value="3">3 & up</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort by: None</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}
