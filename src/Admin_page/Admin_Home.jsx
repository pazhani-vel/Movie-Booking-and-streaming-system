import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin_Home.css";

const Admin_MoviePage = () => {
  const [title, setTitle] = useState("");
  const [cast, setCast] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/admin_page_movies");
      setMovies(res.data.movies);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMessage("Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = async (e) => {
    e.preventDefault();

    if (!title || !cast || !description || !genre) {
      setMessage("All fields are required!");
      return;
    }

    const castArray = cast.split(",").map((c) => c.trim());

    try {
      const res = await axios.post("http://127.0.0.1:5000/Add_movie_admin", {
        title,
        cast: castArray,
        description,
        genre,
      });

      setMessage(res.data.message);
      setTitle("");
      setCast("");
      setDescription("");
      setGenre("");
      fetchMovies();
    } catch (err) {
      console.error(err);
      setMessage("Failed to add movie");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await axios.delete(
        `http://127.0.0.1:5000/Delete_movie_admin/${id}`
      );
      setMessage(res.data.message);
      fetchMovies();
    } catch (err) {
      console.error("Error deleting movie:", err);
      setMessage("Failed to delete movie");
    }
  };

  const filteredMovies = movies.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(m.cast) &&
        m.cast.join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      {/* ✅ TOP HEADER */}
      <header className="admin-header">
        <h1 className="logo-title">MovieVerse</h1>

        <button className="logout-btn" onClick={() => (window.location.href = "/admin_login")}>
          <i className="fa-solid fa-door-open"></i> Sign Out
        </button>
      </header>

      {/* ✅ REST PAGE CONTENT */}
      <div className="admin-container">
        <div className="form-card">
          <h2 className="form-title">🎬 Add New Movie</h2>

          {message && <div className="alert">{message}</div>}

          <form onSubmit={handleAddMovie}>
            <input type="text" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Cast (comma separated)" value={cast} onChange={(e) => setCast(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <button type="submit" className="add-btn">Add Movie</button>
          </form>
        </div>

        <div className="movies-list">
          <h2 className="list-title">All Movies</h2>

          <input
            type="text"
            placeholder="Search by title or cast..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredMovies.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Cast</th>
                  <th>Description</th>
                  <th>Genre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}</td>
                    <td>{movie.description}</td>
                    <td>{movie.genre}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(movie._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin_MoviePage;
