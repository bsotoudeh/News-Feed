import React, { useState } from "react";

function SearchNews(props) {
  const [filters, setFilters] = useState([]);
  const [keywordsSearch, setKeywordsSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filters.length > 0) {
      props.handleSubmit(filters);
    } else if (keywordsSearch.trim() !== "") {
      props.handleSubmit(keywordsSearch);
    }
  };

  const filterResults = (e) => {
    const newValue = e.target.value;
    if (e.target.checked) {
      setFilters([...filters, newValue]);
    } else {
      setFilters(filters.filter((filter) => filter !== newValue));
    }
  };

  const handleKeywordsSearch = (event) => {
    setKeywordsSearch(event.target.value);
  };

  return (
    <div className="flex items-center flex-col py-6">
      <div className="font-semibold text-xl text-blue-800">
        Filter by Source and keywords:
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
      >
        <div className="p-4">
          <input
            id="NYTime"
            type="checkbox"
            value="New York Times"
            onChange={filterResults}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="NYTime"
            className="text-pretty mx-2 font-medium text-gray-900"
          >
            New York Times
          </label>
          <input
            id="News"
            type="checkbox"
            value="News Api"
            onChange={filterResults}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="News"
            className="w-fill mx-2 font-medium text-gray-900"
          >
            News Api
          </label>
          <input
            id="Guardians"
            type="checkbox"
            value="Guardian News"
            onChange={filterResults}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="Guardians"
            className="w-fill mx-2 font-medium text-gray-900"
          >
            Guardian News
          </label>
          <input
            type="text"
            placeholder="Search keywords..."
            onChange={handleKeywordsSearch}
            value={keywordsSearch}
            className="shadow appearance-none border rounded px-4 py-2 my-4 lg:mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Filter Results
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchNews;
