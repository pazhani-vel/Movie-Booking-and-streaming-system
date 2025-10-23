
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import MovieCard from "../components/MovieCard.jsx";
import BookingModal from "../components/BookingModal.jsx";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navigationbar from "../components/Navbar/Navbar.jsx";
import Footerbar from "../components/Footer/Footer.jsx";

function TicketBookingPage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const { user } = useContext(UserContext);

  // Fetch movies from backend
  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/movies");
      console.log("Movies fetched:", res.data); // check here
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error.response || error.message);
    }
  };
  fetchMovies();
}, []);


  // When a movie card is clicked
  function handleMovieClick(movie)
  {
    navigate(`/booking/${movie._id}`);
  }

  return (
    <>
      <Navigationbar/>

      <Container fluid style={{ paddingTop: "10rem" }}>
        <h2 className="mb-4">🎬Top Recommended Movies</h2>

        <Row className="mb-4">
          {movies.sort((x,y)=>{return y.likes-x.likes}).map((movie) => (
            <Col md={3} sm={6} xs={12} key={movie._id} className="mb-4 p-0">
              <MovieCard id={movie._id} name={movie.name} genre={movie.genre} language={movie.language} rating={movie.rating} like={movie.likes} poster={movie.poster_url} onClick={() => handleMovieClick(movie)} />
            </Col>
          )).slice(0,3)}
        </Row>
      </Container>

      <Container fluid style={{ paddingTop: "10rem" }}>
        <h2 className="mb-4">🎬Movies List</h2>

        <Row className="mb-4">
          {movies.map((movie) => (
            <Col md={3} sm={6} xs={12} key={movie._id} className="mb-4 p-0">
              <MovieCard id={movie._id} name={movie.name} genre={movie.genre} language={movie.language} rating={movie.rating} like={movie.likes} onClick={() => handleMovieClick(movie)} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footerbar/>
    </>
  );
}


export default TicketBookingPage;
