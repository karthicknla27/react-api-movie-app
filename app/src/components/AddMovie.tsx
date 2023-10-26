import React, { useState } from "react";
import Layout from "./Layout";
import MovieForm from "./MovieForm";
import { Todo1 } from "../types";
import { createMovie } from "./apiService"; // Import the POST function
import Modal from "./Modal"; // Import your Modal component

const AddMovie: React.FC = () => {
  const [dialog, setDialog] = useState(false);

  const handleMovieAdded = async (movie: Todo1) => {
    try {
      await createMovie(movie);
      console.log("Movie created:", movie);
      setDialog(true); // Show the modal on successful movie creation
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <Layout title="movies/addmovies">
      <h2 className="add-title">Add movie</h2>
      <MovieForm onSubmit={handleMovieAdded} />
      <Modal dialog={dialog} setDialog={setDialog} /> {/* Display the modal */}
    </Layout>
  );
};

export default AddMovie;
