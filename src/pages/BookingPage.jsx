// BookingPage.jsx
import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, ProgressBar } from "react-bootstrap";
import mockMovies from "../mockData/mockMovies";
import axios from "axios";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

export default function BookingPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie,setMovie]=useState(null)
  //const movie = mockMovies.find(m => m._id === movieId);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/booking/${movieId}`);
        setMovie(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    fetchMovie();
  }, [movieId]);

  const [vote, setVote] = useState("");

  const handleBook = () => {
    navigate(`/language/${movieId}`);
  };

  if(!movie)
  {
    return<></>
  }

  return (
    <>
    <Navigationbar/>
    <Container fluid style={{ paddingTop: "10rem" }}>
      <Row>
        {/* Left Half */}
        <Col md={6}>
          <Card className="bg-dark text-white mb-3">
            {/* <Card.Img variant="top" src={movie.poster_url} height="400px" style={{ objectFit: "cover" }}/> */}
            <Card.Body>
              <Card.Title>{movie.name}</Card.Title>
              <Card.Text>
                {/* <strong>Description:</strong> {movie.description || "Lorem ipsum dolor sit amet."}<br/> */}
                <strong>Likes:</strong> {movie.likes} ❤️ <br/>
                <strong>Rating:</strong> {movie.rating} ⭐ <br/>
                {/* <strong>Cast:</strong> {movie.cast?.join(", ") || "N/A"} */}
                <strong>Language:</strong> {movie.language.join(",")}<br/>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Half */}
        <Col md={6}>
          <h5>Vote / Rating</h5>
          <div className="mb-3">
            {["Blockbuster","Hit","Average","Flop"].map(v => (
              <Button
                key={v}
                variant={vote === v ? "success" : "secondary"}
                className="me-2 mb-2"
                onClick={()=>setVote(v)}
              >
                {v}
              </Button>
            ))}
          </div>

          <Button variant="primary" onClick={handleBook}>Book Tickets</Button>
        </Col>
      </Row>
    </Container>
    <Footerbar/>
    </>
    
  );
}
