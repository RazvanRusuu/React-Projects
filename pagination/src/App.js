import React, { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import Follower from "./components/Follower";

function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const nextPage = () => {
    setPage((prevPage) => {
      let newPage = prevPage + 1;
      if (newPage > data.length - 1) {
        newPage = 0;
      }
      return newPage;
    });
  };

  const prevPage = () => {
    setPage((prevPage) => {
      let newPage = prevPage - 1;
      if (newPage < 0) {
        newPage = data.length - 1;
      }
      console.log(newPage);
      return newPage;
    });
  };

  const contentBtn = (
    <div className="btn-container">
      <button className="prev-btn" onClick={prevPage}>
        Prev
      </button>
      {data.map((_, index) => {
        return (
          <button
            key={index}
            className={`page-btn ${index === page ? "active-btn" : ""}`}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </button>
        );
      })}
      <button className="next-btn" onClick={nextPage}>
        Next
      </button>
    </div>
  );

  return (
    <main>
      <section className="section-title">
        <h1>{loading ? "loading..." : "pagination"}</h1>
        <div className="underline"></div>
      </section>
      <section className="followers">
        <div className="container">
          {followers.map((person) => {
            const {
              avatar_url: img,
              login: userName,
              html_url: url,
              id,
            } = person;
            return (
              <Follower key={id} img={img} name={userName} url={url} id={id} />
            );
          })}
        </div>
        {!loading && contentBtn}
      </section>
    </main>
  );
}

export default App;
