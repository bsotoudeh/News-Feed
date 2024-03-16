import { useState } from "react";

function FilterSourceAuthors(props) {
  const [filters, setFilters] = useState([]);
  const [titleSearch, setTitleSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filters.length > 0) {
      props.handleSubmit(filters);
    } else if (titleSearch.trim() !== "") {
      props.handleSubmit(titleSearch.trim());
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
  const handleTitleSearch = (event) => {
    setTitleSearch(event.target.value);
  };

  const handleReset = () => {
    setFilters([]);
    setTitleSearch("");
    props.handleReset();
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
          <label className="font-semibold mt-4">
            Search by article's title:
          </label>
          <input
            type="text"
            placeholder="Search article's title..."
            value={titleSearch}
            onChange={handleTitleSearch}
            className="shadow appearance-none border rounded px-4 py-2 lg:my-4 lg:mx-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            className="bg-white hover:bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded outline outline-2"
            type="submit"
          >
            Filter
          </button>
          <button
            className="bg-white hover:bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded border ml-4"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterSourceAuthors;
