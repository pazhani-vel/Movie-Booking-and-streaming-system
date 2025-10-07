// import React, { useContext, useEffect, useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import MovieCard from "../components/MovieCard";
// import BookingModal from "../components/BookingModal";
// import AppNavbar from "../components/Navbar";
// import mockMovies from "../mockData/mockMovies.js";
// import { UserContext } from "../context/UserContext.jsx";

// export default function TicketBookingPage() 
// {
//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const {user,setuser}=useContext(UserContext);

//   useEffect(() => {
//     // Instead of axios, use mock data
//     const sorted = mockMovies.sort((a, b) => {
//       const priorityA = a.language.includes("Tamil") || a.language.includes("Hindi") ? 1 : 2;
//       const priorityB = b.language.includes("Tamil") || b.language.includes("Hindi") ? 1 : 2;
//       if (priorityA !== priorityB) return priorityA - priorityB;
//       return b.rating - a.rating;
//     });
//     setMovies(sorted);
//     setFilteredMovies(sorted);
//   }, []);

//   const handleSearch = (query) => {
//     const filtered = movies.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
//     setFilteredMovies(filtered);
//   };

//   const handleMovieClick = (movie) => {
//     setSelectedMovie(movie);
//     setShowModal(true);
//   };

//   // Split into sets of 4
//   const movieSets = [];
//   for (let i = 0; i < filteredMovies.length; i += 4) {
//     movieSets.push(filteredMovies.slice(i, i + 4));
//   }

//   return (
//     <>
//       <AppNavbar onSearch={handleSearch} />
//       <Container fluid style={{ padding: "2rem", paddingTop: "6rem" }}>
//         <h2 className="mb-4">🎬 Top Rated Movies</h2>
//         {alert(user.name)}

//         {movieSets.map((set, idx) => (
//           <Row key={idx} className="mb-4">
//             {set.map(movie => (
//               <Col md={3} sm={6} xs={12} key={movie._id} className="mb-4">
//                 <MovieCard movie={movie} onClick={handleMovieClick}/>
//               </Col>
//             ))}
//           </Row>
//         ))}
//       </Container>

//       <BookingModal show={showModal} onClose={() => setShowModal(false)} movie={selectedMovie}/>
//     </>
//   );
// }


import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import BookingModal from "../components/BookingModal";
//import AppNavbar from "../components/Navbar";
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
        <h2 className="mb-4">🎬 Top Rated Movies</h2>

        <Row className="mb-4">
          {movies.map((movie) => (
            <Col md={3} sm={6} xs={12} key={movie._id} className="mb-4">
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
