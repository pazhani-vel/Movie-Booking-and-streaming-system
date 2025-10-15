import React from "react";
import { Card, Button } from "react-bootstrap";
import not_available_poster from "/Backend/static/poster_not_available.png"

function MovieCard({ name,genre,language,rating,like,onClick,id,poster}) 
{
  if (!name) return null;

  return (
    <Card className="h-100 w-100 p-2 m-4 text-white bg-dark shadow-lg movie-card" style={{cursor:"pointer",borderRadius:"15px"}} onClick={onClick}>
      {/* Poster */}
      <Card.Img
        variant="top"
        src={poster || not_available_poster}
        height="300"
        style={{ objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        {/* Movie Name */}
        <Card.Title style={{ fontSize: "1.1rem", fontWeight: 900,color:"white",fontFamily:"cursive"}}>
          {name}
        </Card.Title>

        {/* Movie Details */}
        <Card.Text style={{ fontSize: "0.9rem", flexGrow: 1,alignContent:"center",placeContent:"center"}}>
          <strong>Genre:</strong> {genre} <br />
          <strong>Language:</strong> {language} <br />
          <strong>⭐ {rating} | ❤️  {like}</strong>
        </Card.Text>

        {/* Book Now Button */}
        <Button
          variant="primary"
          className="w-100 mt-auto"
          onClick={onClick}  // open modal
        >
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
