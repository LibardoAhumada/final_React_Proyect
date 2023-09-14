import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

const BASE_URL = "https://devtoreact-default-rtdb.firebaseio.com/.json";

function App() {
  const [post, setPost] = useState([]);
  const [isCreating, setCreating] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      titulo: "Titulo",
      autor: "Nombre",
      imagen: "URL de la imagen",
      contenido: "contenido",
    },
  });

  const showCreateHandler = () => {
    setCreating(true);
  };

  const hideCreateHandler = () => {
    setCreating(false);
  };

  const addPost = async (data) => {
    const newPost = {
      titulo: data.titulo,
      autor: data.autor,
      contenido: data.comentario,
      categoria: data.categoria,
      imagen: data.imagen,
    };

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const updatedPosts = [...post, newPost];
        setPost(updatedPosts);
        reset();
        hideCreateHandler();
      } else {
        console.error("Error al agregar el post");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    const postData = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      const arrayPosts = Object.values(data);
      setPost(arrayPosts);
    };
    postData();
  }, []);

  return (
    <>
    <div className="col-8 flex justify content-center">



    {isCreating && (
        <form onSubmit={handleSubmit(addPost)}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Titulo
            </span>
            <input
              type="text"
              {...register("titulo")}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Imagen
            </span>
            <input
              type="text"
              {...register("imagen")}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Nombre
            </span>
            <input
              type="text"
              {...register("autor")}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Tags
            </label>
            <select className="form-select" id="inputGroupSelect01" {...register("categoria")}>
              <option>Choose...</option>
              <option value="1">HTML</option>
              <option value="2">JavaScript</option>
              <option value="3">Python</option>
            </select>
          </div>
          <div className="input-group">
            <span className="input-group-text">Comentario</span>
            <textarea
              className="form-control"
              {...register("comentario")}
              aria-label="With textarea"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Crear Nuevo Post
          </button>
        </form>
      )}

      {post.map((pos, index) => {
        return (
          <div className="card mb-3" key={index}>
            <img src={pos.imagen} className="card-img-top" alt="..." />
            <a href="#" className="btn btn-primary" onClick={showCreateHandler}>
              Crear Nuevo Post
            </a>
            <div className="card-body">
              <h5 className="card-title">{pos.titulo}</h5>
              <h3 className="card-title">{pos.autor}</h3>
              <p className="card-text">{pos.contenido}</p>
              <p className="card-text">
                <span className="text-body-secondary">tag 1</span>
                <span>{pos.categoria}</span>
                <span> Javascript</span>
              </p>
              <a href="#" className="btn btn-primary">
                Button
              </a>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
        );
      })}


    </div>
    </>
  );
}

export default App;
