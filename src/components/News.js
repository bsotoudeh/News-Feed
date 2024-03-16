import "../App.css";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

function News(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!props.data);
  }, [props.data]);
  return (
    <div className="flex w-full h-full lg:px-6 justify-center items-center">
      {loading ? (
        <div className="text-center text-gray-600 text-4xl">Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-3 lg:gap-5 mx-auto">
          {props.data.map((post, index) =>
            (post.title && post.title !== "[Removed]") || post.webTitle ? (
              <div
                key={index}
                className="w-ful max-w-md mx-auto bg-white shadow relative"
              >
                <img
                  className="h-56 w-full object-cover"
                  src={
                    post.urlToImage ||
                    (post.media &&
                      post.media[0]?.type === "image" &&
                      post.media[0]["media-metadata"][2]?.url)
                  }
                  alt="Article"
                />
                <div className="h-72 p-6">
                  <h3 className="font-semibold">
                    {post.title || post.webTitle}
                  </h3>
                  <p className="py-3 h-20 overflow-clip">
                    {post.description || post.abstract || post.webUrl}
                  </p>
                  <p className="py-3 text-md text-slate-700">
                    <span className="font-semibold">Source:&nbsp;&nbsp;</span>
                    {post.source}
                  </p>
                  <div className="flex items-center justify-between text-nowrap absolute bottom-0 left-5 right-5 text-gray-600 text-sm border-t-2 border-neutral-100 py-3 text-surface/75 dark:border-white/10 dark:text-neutral-300">
                    <p className="truncate">
                      <span className="font-semibold">Author:&nbsp;&nbsp;</span>
                      {post.byline || post.author}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Published Date:&nbsp;&nbsp;
                      </span>
                      {post.publishedAt ||
                      post.webPublicationDate ||
                      post.published_date
                        ? dayjs(
                            post.publishedAt ||
                              post.webPublicationDate ||
                              post.published_date
                          ).format("DD-MM-YYYY")
                        : "Date not available"}
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default News;
