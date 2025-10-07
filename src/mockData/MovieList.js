import React, { useState } from "react";
import SearchBar from "./SearchBar";
import mockMovies from "./mockMovies";

export default function MovieList() {
  const [filteredMovies, setFilteredMovies] = useState(mockMovies);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      setFilteredMovies(mockMovies);
      return;
    }

    const results = mockMovies.filter((movie) => {
      // Check name
      const nameMatch = movie.name.toLowerCase().includes(lowerQuery);

      // Check genre
      const genreMatch = movie.genre.some((g) =>
        g.toLowerCase().includes(lowerQuery)
      );

      // Check language
      const languageMatch = movie.language.some((l) =>
        l.toLowerCase().includes(lowerQuery)
      );

      return nameMatch || genreMatch || languageMatch;
    });

    setFilteredMovies(results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div
        className="movie-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="movie-card"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
                width: "200px",
              }}
            >
              <img
                src={movie.poster_url}
                alt={movie.name}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h5>{movie.name}</h5>
              <p>
                <strong>Genre:</strong> {movie.genre.join(", ")}
              </p>
              <p>
                <strong>Language:</strong> {movie.language.join(", ")}
              </p>
              <p>
                <strong>Rating:</strong> {movie.rating}
              </p>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
