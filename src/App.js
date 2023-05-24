import React, { useCallback, useEffect, useState } from "react";
import Form from "./components/Form";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let interval;

  const retry = useCallback(async () => {
    return await fetch(
      "https://backend-c2698-default-rtdb.firebaseio.com/movies.json"
    );
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://backend-c2698-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();
      console.log(data);
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let content = <p>found no movies.</p>;

  async function addMovieHandler(movie) {
    const res = await fetch(
      "https://backend-c2698-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res);
  }

  const removeMovie = async (id) => {
    await fetch(
      `https://backend-c2698-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    );
    fetchData();

    // .then((res) => console.log("remove" + res));
  };

  if (movies.length > 0) {
    content = (
      <p>
        <MoviesList movies={movies} removeMovie={removeMovie} />
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
    content = <b>Loading...</b>;
  }

  return (
    <React.Fragment>
      <section>
        <Form addMovieHandler={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchData}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
