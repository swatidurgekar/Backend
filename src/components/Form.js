import { useRef } from "react";

const Form = () => {
  const title = useRef();
  const openingText = useRef();
  const releaseDate = useRef();

  const addMovieHandler = (event) => {
    event.preventDefault();
    const newMovie = {
      title: title.current.value,
      openingText: openingText.current.value,
      releaseDate: releaseDate.current.value,
    };
    console.log(newMovie);
  };

  return (
    <form onSubmit={addMovieHandler}>
      <div>
        <label htmlFor="title" className="form-label">
          <b>Title</b>
        </label>
        <input ref={title} type="text" className="form-control" id="title" />
        <label htmlFor="openingText" className="form-label">
          <b>Opening Text</b>
        </label>
        <input
          ref={openingText}
          type="text"
          className="form-control"
          id="openingText"
        />
        <label htmlFor="releaseDate" className="form-label">
          <b>Release Date</b>
        </label>
        <input
          ref={releaseDate}
          type="date"
          className="form-control"
          id="releaseDate"
        />
      </div>
      <button
        type="submit"
        className="btn "
        style={{ background: "#230052", color: "white" }}
      >
        Add Movie
      </button>
    </form>
  );
};

export default Form;
