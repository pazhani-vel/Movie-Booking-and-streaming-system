import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import MovieCard from "../components/MovieCard.jsx";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigationbar from "../components/Navbar/Navbar.jsx";
import Footerbar from "../components/Footer/Footer.jsx";

function TicketBookingPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setErrMsg("");

      try {
        const res = await axios.get("http://127.0.0.1:5000/movies");

        const raw = Array.isArray(res.data) ? res.data : res.data?.movies ?? [];

        // ✅ Normalize movie fields (avoid undefined)
        const formatted = raw.map((m) => ({
          _id: m._id ?? m.id ?? String(Math.random()),
          name: m.name ?? "",
          genre: m.genre ?? "",
          language: m.language ?? "",
          rating: m.rating ?? 0,
          likes: m.likes ?? 0,
          poster_url: m.poster_url ?? m.poster ?? "",
        }));

        setMovies(formatted);
      } catch (error) {
        setErrMsg("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // ✅ Helper function — prevents toLowerCase error
  const safeLower = (text) => (typeof text === "string" ? text.toLowerCase() : "");

  // ✅ Search by name, genre, language
  const filteredMovies = movies.filter((movie) => {
    const text = safeLower(search);
    return (
      safeLower(movie.name).includes(text) ||
      safeLower(movie.genre).includes(text) ||
      safeLower(movie.language).includes(text)
    );
  });

  // ✅ Top 4 movies by likes (copy to avoid mutating state)
  const topMovies = [...filteredMovies].sort((a, b) => b.likes - a.likes).slice(0, 4);

  function handleMovieClick(movie) {
    navigate(`/booking/${movie._id}`);
  }

  return (
    <>
      <Navigationbar />

      <style>{`
        .ticket-section {
          padding-top: 90px;
          padding-left: 4%;
          padding-right: 4%;
        }

        .ticket-heading {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 18px;
          border-left: 4px solid #00e5ff;
          padding-left: 14px;
          text-shadow: 0px 0px 20px rgba(0,229,255,.3);
        }

        .ticket-row {
          row-gap: 22px;
        }

        /* 🔍 Search Bar */
        .search-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 110px;
          margin-bottom: 30px;
        }

        .search-input {
          width: 65%;
          padding: 14px 20px;
          font-size: 1rem;
          border-radius: 30px;
          border: 2px solid transparent;
          outline: none;
          background: rgba(20, 20, 20, 0.8);
          color: white;
          transition: 0.3s ease;
          backdrop-filter: blur(6px);
          box-shadow: 0px 0px 15px rgba(0,229,255,0.3);
        }

        .search-input:focus {
          border-color: #00e5ff;
          box-shadow: 0px 0px 20px rgba(0,229,255,0.6);
        }

        @media (max-width: 768px) {
          .search-input { width: 90%; }
        }

        .center {
          text-align: center;
        }
      `}</style>

      {/* 🔍 Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by movie name, genre or language..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <div className="center">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && errMsg && (
        <Alert variant="danger" className="center">{errMsg}</Alert>
      )}

      {!loading && !errMsg && (
        <>
          <section className="ticket-section">
            <h2 className="ticket-heading">🔥 Top Recommended Movies</h2>
            <Row className="ticket-row">
              {topMovies.map((movie) => (
                <Col key={movie._id} lg={3} md={4} sm={6} xs={12}>
                  <MovieCard
                    id={movie._id}
                    name={movie.name}
                    genre={movie.genre}
                    language={movie.language}
                    rating={movie.rating}
                    like={movie.likes}
                    poster={movie.poster_url}
                    onClick={() => handleMovieClick(movie)}
                  />
                </Col>
              ))}
            </Row>
          </section>

          <section className="ticket-section">
            <h2 className="ticket-heading">🎬 Movies List</h2>
            <Row className="ticket-row">
              {filteredMovies.map((movie) => (
                <Col key={movie._id} lg={3} md={4} sm={6} xs={12}>
                  <MovieCard
                    id={movie._id}
                    name={movie.name}
                    genre={movie.genre}
                    language={movie.language}
                    rating={movie.rating}
                    like={movie.likes}
                    poster={movie.poster_url}
                    onClick={() => handleMovieClick(movie)}
                  />
                </Col>
              ))}
            </Row>
          </section>
        </>
      )}

      <Footerbar />
    </>
  );
}

export default TicketBookingPage;
