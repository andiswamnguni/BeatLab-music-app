import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tracks..."
        className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
      />
      <button
        type="submit"
        className="bg-green-500 px-4 rounded-r-lg hover:bg-green-400"
      >
        Search
      </button>
    </form>
  );
}
