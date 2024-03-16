import { useState, useEffect } from "react";
import axios from "axios";
import NewsManager from "./components/NewsManager";
import Navbar from "./components/Navbar";
import "./App.css";

const {
  REACT_APP_NY_TIMES_API_KEY,
  REACT_APP_NEWS_API_KEY,
  REACT_APP_GUARDIAN_API_KEY,
  REACT_APP_NY_TIMES_URL,
  REACT_APP_NEWS_API_URL,
  REACT_APP_GUARDIAN_URL,
} = process.env;

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${REACT_APP_NY_TIMES_URL}${REACT_APP_NY_TIMES_API_KEY}`),
      axios.get(`${REACT_APP_NEWS_API_URL}${REACT_APP_NEWS_API_KEY}`),
      axios.get(`${REACT_APP_GUARDIAN_URL}${REACT_APP_GUARDIAN_API_KEY}`),
    ])
      .then(([nyTimesResponse, newsApiResponse, guardianapis]) => {
        const results1 = nyTimesResponse.data.results;
        const results2 = newsApiResponse.data.articles;
        const results3 = guardianapis.data.response.results;
        const combineAndSortResults = () => {
          const allResults = [
            ...results1,
            ...results2.map((result) => ({
              ...result,
              source: "News Api",
              author: result.author ?? "News Api",
            })),
            ...results3.map((result) => ({
              ...result,
              source: "Guardian News",
              author: "Guardian News",
              urlToImage:
                "https://i.guim.co.uk/img/media/90fe428a0f01c5fca29ccb1132c6d9bb9b1fe70d/0_173_5974_3585/master/5974.jpg?width=220&dpr=1&s=none",
            })),
          ];

          setPosts(allResults);
        };
        combineAndSortResults();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <NewsManager data={posts} />
    </div>
  );
}

export default App;
