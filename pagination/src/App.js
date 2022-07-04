import React, { useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./components/Follower";

function App() {
  const { loading, data } = useFetch();

  return (
    <main>
      <section className="section-title">
        <h1>{loading ? "loading..." : "pagination"}</h1>
        <div className="underline"></div>
      </section>
      <section className="followers">
        <div className="container">
          {data.map((person) => {
            console.log(person);
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
      </section>
    </main>
  );
}

export default App;
