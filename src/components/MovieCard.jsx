// import React from "react";
// import { Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// export default function MovieCard({ movie }) {
//   const navigate = useNavigate();

//   if (!movie) return null;

//   return (
//     <Card className="h-100 text-white bg-dark shadow-lg movie-card">
//       {/* Poster */}
//       <Card.Img
//         variant="top"
//         src={movie.poster_url || "https://via.placeholder.com/300x450"}
//         height="300"
//         style={{ objectFit: "cover" }}
//       />

//       <Card.Body className="d-flex flex-column">
//         {/* Movie Name */}
//         <Card.Title style={{ fontSize: "1.1rem", fontWeight: 600 }}>
//           {movie.name}
//         </Card.Title>

//         {/* Movie Details */}
//         <Card.Text style={{ fontSize: "0.9rem", flexGrow: 1 }}>
//           <strong>Genre:</strong> {movie.genre?.join(", ") || "-"} <br />
//           <strong>Language:</strong> {movie.language?.join(", ") || "-"} <br />
//           <strong>⭐ {movie.rating || "-"} | ❤️ {movie.likes || "-"}</strong>
//         </Card.Text>

//         {/* Book Now Button */}
//         <Button
//           variant="primary"
//           className="w-100 mt-auto"
//           onClick={() => navigate(`/booking/${movie._id}`)}
//         >
//           Book Now
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }


import React from "react";
import { Card, Button } from "react-bootstrap";

function MovieCard({ name,genre,language,rating,like,onClick,id}) 
{
  if (!name) return null;

  return (
    <Card className="h-100 text-white bg-dark shadow-lg movie-card">
      {/* Poster */}
      {/* <Card.Img
        variant="top"
        src={movie.poster_url || "https://via.placeholder.com/300x450"}
        height="300"
        style={{ objectFit: "cover" }}
      /> */}

      <Card.Body className="d-flex flex-column">
        {/* Movie Name */}
        <Card.Title style={{ fontSize: "1.1rem", fontWeight: 600 }}>
          {name}
        </Card.Title>

        {/* Movie Details */}
        <Card.Text style={{ fontSize: "0.9rem", flexGrow: 1 }}>
          <strong>Genre:</strong> {genre} <br />
          <strong>Language:</strong> {language} <br />
          <strong>⭐ {rating} | ❤️ {like}</strong>
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
