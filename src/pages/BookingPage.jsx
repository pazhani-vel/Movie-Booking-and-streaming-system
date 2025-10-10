
import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, ProgressBar } from "react-bootstrap";
import axios from "axios";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";
import loadingvideo from  '/src/assets/Loading.mp4';
import like from '../assets/like.png';

function BookingPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie,setMovie]=useState(null);

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

  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false); // track if clicked once

  const handleClick = () => {
    if (clicked==false) {       // only allow first click
      setLiked(true);
      setClicked(true);

      axios.post(`http://127.0.0.1:5000/likes/${movieId}`)
      .then((res)=>console.log(res));
        
    }
  };

  const handleBook = () => {
    navigate(`/language/${movieId}`);
  };

  if(!movie)
  {
    return<>{loadingvideo}</>
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
          <h5>Rating</h5>
          <div className="mb-3">
            <br></br>
                  <img style={{width:"40px",height:"40px"}} className="like" src={like} alt="Like icon" />
                  <button
      onClick={() => handleClick() }
      style={{
        backgroundColor: liked ? "green" : "red",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
      }} className="m-2" >
      Like
    </button>
                  <p>Hit Your Like Here</p>
          </div>

          <Button variant="primary" onClick={handleBook}>Book Tickets</Button>
        </Col>
      </Row>
    </Container>
    <Footerbar/>
    </>
    
  );
}

export default BookingPage;
