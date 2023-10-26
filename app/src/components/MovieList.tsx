import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types";
import Layout from "./Layout";
import { deleteMovie, getMovies } from "./apiService"; // Import the DELETE function
import Modal from "./Modal";


const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    async function getMoviesFromAPI() {
      try {
        const response = await getMovies();
        setTodos(response);
      } catch (error) {
        console.log(error);
      }
    }
    getMoviesFromAPI();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteMovie(id); 
      console.log("Todo deleted:", id);
      setDialog(true);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    
  };

  return (
    <Layout title="movies">
      <h1>Movies</h1>
      <button onClick={() => navigate("/add")} className="home-add-btn">
        <i className="fa fa-plus kkk"> </i>
      </button>

      <div className="grid">
        {todos.map((todo) => (
          <div key={todo.id}>
            <article>
              <h2>movie- {todo.title}</h2>
              <h3> Year: {todo.year}</h3>

              <div className="btn-wrap">
                <button className="edit-btn">
                  <Link to={`/edit/${todo.id}`}>
                    <i className="fa fa-edit"> </i>
                  </Link>
                </button>
                <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                  <i className="fa fa-trash-o"></i>
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>

      <Modal dialog={dialog}  setDialog= {setDialog}/>

    </Layout>
  );
};

export default MovieList;
