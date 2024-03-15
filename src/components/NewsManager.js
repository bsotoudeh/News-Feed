import { useState, useEffect } from "react";
import SearchNews from "./SearchNews";
import FilterNews from "./FilterNews";
import News from "./News";
import dayjs from "dayjs";

function NewsManager(props) {
  const [filteredData, setFilteredData] = useState(props.data);

  const filterNewsFeedBySource = (filters) => {
    if (!filters && filters.length === 0) {
      setFilteredData(props.data);
    } else {
      const filteredResults = props.data.filter((item) => {
        if (item.source && item.source.name) {
          return filters.includes(item.source.name);
        } else if (item.source) {
          return filters.includes(item.source);
        } else if (item.title && item.title !== "[Removed]") {
          return item.title
            .toLowerCase()
            .trim()
            .includes(filters.toLowerCase().trim());
        } else if (item.webTitle) {
          const regex = new RegExp(filters, "i");
          return regex.test(item.webTitle);
        }
        return false;
      });
      setFilteredData(filteredResults);
    }
  };

  const filterNewsFeedBySection = (filters) => {
    if (!filters || filters === "All") {
      setFilteredData(props.data);
      return;
    }

    const filteredResults = props.data.filter((item) => {
      if (!item.published_date || !dayjs(item.published_date).isValid()) {
        return false;
      }

      const formattedDate = dayjs(item.published_date).format("DD-MM-YYYY");

      if (filters.includes(item.section) || filters.includes(item.pillarName)) {
        return true;
      }

      if (
        item.author &&
        item.author.toLowerCase().includes(filters.toLowerCase())
      ) {
        return true;
      }

      if (
        item.byline &&
        item.byline.toLowerCase().includes(filters.toLowerCase())
      ) {
        return true;
      }

      if (filters.includes(formattedDate)) {
        return true;
      }

      return false;
    });

    setFilteredData(filteredResults);
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
        <SearchNews handleSubmit={filterNewsFeedBySource} data={props.data} />
      </div>
      <div>
        <FilterNews handleSubmit={filterNewsFeedBySection} data={props.data} />
      </div>
      <div>
        <News data={filteredData} />
      </div>
    </div>
  );
}

export default NewsManager;
