import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ name, genre, poster, id }) {
  return (
    <Link to={`/get/${id}`} className="link-component">
      <div className="card-item">
        <img src={poster} alt="Poster" />

        <div className="overlay">
          <h3>{name}</h3>
          <p>{genre}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
