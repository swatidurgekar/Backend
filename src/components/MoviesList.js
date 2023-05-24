import React, { memo } from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  // const removeMovie = async (id) => {
  //   await fetch(
  //     `https://backend-c2698-default-rtdb.firebaseio.com/movies/${id}`,
  //     {
  //       method: "DELETE",
  //     }
  //   );
  // };

  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <div>
          <Movie
            key={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            openingText={movie.openingText}
          />
          <button onClick={() => props.removeMovie(movie.id)}>REMOVE</button>
        </div>
      ))}
    </ul>
  );
};

export default memo(MovieList);
