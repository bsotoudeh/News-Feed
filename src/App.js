import { useState, useEffect } from "react";
import axios from "axios";
import NewsManager from "./components/NewsManager";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(
        "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=aqP3l9G1fBcjkW5nzbOtxlMjOCBa3zTs"
      ),
      axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=e91863d95d6244aab0835fef06985d39"
      ),
      axios.get(
        "https://content.guardianapis.com/search?tag=environment/recycling&api-key=271b5dc9-22c3-439d-85ea-4ee06a96b218"
      ),
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
