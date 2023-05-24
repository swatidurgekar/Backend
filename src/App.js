import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let interval;

  async function retry() {
    await fetch("https://swapi.dev/api/films/");
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("https://swapi.dev/api/films/");
        if (!response.ok) {
          throw new Error("Something went wrong ....Retrying");
        }
        const data = await response.json();

        const tranformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(tranformedMovies);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  let content = <p>found no movies.</p>;

  if (movies.length > 0) {
    content = (
      <p>
        <MoviesList movies={movies} />
      </p>
    );
  }

  if (error) {
    interval = setInterval(retry, 5000);
    function stop() {
      clearInterval(interval);
    }
    content = (
      <p>
        {error}
        <button onClick={stop}>Cancel</button>
      </p>
    );
  }

  if (isLoading) {
    content = (
      <div className="progress">
        <div className="color"></div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <section>
        <Form />
      </section>

      <section>
        <button>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
