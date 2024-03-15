import { useState } from "react";
import dayjs from "dayjs";

function FilterNews(props) {
  const [filter, setFilter] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleAuthorSearch = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filter) {
      props.handleSubmit(filter);
    } else if (dateFilter) {
      const formattedDate = dayjs(dateFilter).format("DD-MM-YYYY");
      props.handleSubmit(formattedDate);
    }
  };

  const handleDateSelector = (e) => {
    const selectedDate = e.target.value;
    setDateFilter(selectedDate);
  };

  return (
    <div className="flex flex-col border-t border-gray-300 py-6">
      <div className="font-semibold text-xl text-blue-800 mx-auto">
        Filter by Category, Author and Date
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:flex lg:justify-center lg:items-center sm:mx-6 px-4"
      >
        <label className="font-semibold">Filter by categories:</label>
        <select
          className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 my-4 lg:mx-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={filterCategory}
          onChange={handleFilterChange}
        >
          {[
            { label: "All", value: "All" },
            { label: "Health", value: "Health" },
            { label: "Sport", value: "Sport" },
            { label: "Food", value: "Food" },
            { label: "World", value: "World" },
            { label: "News", value: "News" },
            { label: "Lifestyle", value: "Lifestyle" },
            { label: "Arts", value: "Arts" },
          ].map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <label className="font-semibold">Search by Author:</label>
        <input
          type="text"
          placeholder="Search authors..."
          value={filter}
          onChange={handleAuthorSearch}
          className="block shadow appearance-none border rounded px-4 py-2 lg:my-4 lg:mx-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="font-semibold">Filter by Date:</label>

        <input
          type="date"
          onChange={handleDateSelector}
          className="block shadow appearance-none border rounded px-4 py-2 lg:my-4 lg:mx-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Select date"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Filter Results
        </button>
      </form>
    </div>
  );
}

export default FilterNews;
