import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import MovieForm from "./MovieForm";
import Modal from "./Modal"; // Import your Modal component
import { Todo1 } from "../types";
import { updateMovie, getMovieById } from "./apiService"; // Import the PUT and GET functions
import { useParams } from "react-router-dom";

const EditMovie: React.FC = () => {
  const { id } = useParams();
  const [movieTitle, setMovieTitle] = useState("");
  const [dialog, setDialog] = useState(false);
  const [initialMovie, setInitialMovie] = useState<Todo1 | null>(null); // State to store the initial movie data

  useEffect(() => {
    if (id) {
      // Ensure id is defined before making the API call
      getMovieById(id)
        .then((response) => {
          setMovieTitle(response.title);
          setInitialMovie(response); // Store the initial movie data
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    }
  }, [id]);

  const handleMovieUpdated = async (movie: Todo1) => {
    try {
      if (id) {
        await updateMovie(id, movie); // Use optional chaining to ensure id is defined
        console.log("Movie updated:", movie);
        setDialog(true); // Show the modal on successful movie update
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };
  

  return (
    <Layout title={`Edit/ ${movieTitle}`}>
      <h2 className="edit-title">Edit movie</h2>
      {initialMovie && (
        <MovieForm onSubmit={handleMovieUpdated} initialMovie={initialMovie} />
      )}
      <Modal dialog={dialog} setDialog={setDialog} /> {/* Display the modal */}
    </Layout>
  );
};

export default EditMovie;
