import { useState } from "react";
import dayjs from "dayjs";

function FilterCategoryAuthorDate(props) {
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterAuthor) {
      props.handleSubmit(filterAuthor);
    } else if (dateFilter) {
      const formattedDate = dayjs(dateFilter).format("DD-MM-YYYY");
      props.handleSubmit(formattedDate);
    } else if (filterCategory) {
      props.handleSubmit(filterCategory);
    }
  };

  const handleInputChange = (key, value) => {
    switch (key) {
      case "author":
        setFilterAuthor(value);
        break;
      case "category":
        setFilterCategory(value);
        break;
      case "date":
        setDateFilter(value);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setFilterAuthor("");
    setFilterCategory("");
    setDateFilter("");
    props.handleReset();
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
        <label className="font-semibold">Search by Category:</label>
        <input
          type="text"
          placeholder="Search categories like Business..."
          value={filterCategory}
          onChange={(e) => handleInputChange("category", e.target.value)}
          className="block shadow appearance-none border rounded px-4 py-2 lg:my-4 lg:mx-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="font-semibold">Search by Author:</label>
        <input
          type="text"
          placeholder="Search authors..."
          value={filterAuthor}
          onChange={(e) => handleInputChange("author", e.target.value)}
          className="block shadow appearance-none border rounded px-4 py-2 lg:my-4 lg:mx-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="font-semibold">Filter by Date:</label>

        <input
          type="date"
          onChange={(e) => handleInputChange("date", e.target.value)}
          className="block shadow appearance-none border rounded px-4 py-2 lg:my-4 lg:mx-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Select date"
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
      </form>
    </div>
  );
}

export default FilterCategoryAuthorDate;
