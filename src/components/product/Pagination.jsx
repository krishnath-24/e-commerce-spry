import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-4 my-6">
      <button
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="text-gray-600">
        Page {page} of {totalPages}
      </span>
      <button
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}