import { useState, useEffect } from "react";
import FilterSourceAuthors from "./FilterSourceAuthors";
import FilterCategoryAuthorDate from "./FilterCategoryAuthorDate";
import News from "./News";
import dayjs from "dayjs";

function NewsManager(props) {
  const [filteredData, setFilteredData] = useState(props.data);

  const filterNews = (filters) => {
    if (!filters) {
      setFilteredData(props.data);
      return;
    }

    const filteredResults = props.data.filter((item) => {
      if (!item.published_date || !dayjs(item.published_date).isValid()) {
        return false;
      }

      const formattedDate = dayjs(item.published_date).format("DD-MM-YYYY");

      if (item.section && filters.includes(item.section)) {
        return true;
      }

      if (item.pillarName && item.pillarName.includes(filters)) {
        return true;
      }

      if (item.author && item.author.includes(filters)) {
        return true;
      }

      if (item.byline && item.byline.includes(filters)) {
        return true;
      }

      if (item.source && Array.isArray(filters)) {
        return filters.includes(item.source);
      }

      if (item.title && item.title.includes(filters)) {
        return true;
      }

      if (item.webTitle && item.webTitle.includes(filters)) {
        return true;
      }

      if (filters.includes(formattedDate)) {
        return true;
      }

      return false;
    });

    setFilteredData(filteredResults);
  };

  const handleReset = () => {
    setFilteredData(props.data);
  };

  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData]);

  useEffect(() => {
    setFilteredData(props.data);
  }, [props.data]);
  return (
    <div>
      <div>
        <FilterSourceAuthors
          handleSubmit={filterNews}
          handleReset={handleReset}
        />
      </div>
      <div>
        <FilterCategoryAuthorDate
          handleSubmit={filterNews}
          handleReset={handleReset}
        />
      </div>
      <div>
        <News data={filteredData} />
      </div>
    </div>
  );
}

export default NewsManager;
