import React, { useState, useEffect } from "react";
import "./Playerpage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import loadinggif from "/src/assets/Loading.mp4";
import loadingVideo from "/src/assets/loadingVideo.mp4";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

function Playerpage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // ✅ Fetch movie details
  useEffect(() => {
    axios.get(`http://localhost:5000/get/${id}`)
      .then(res => {
        setMovie(res.data);
        checkWishlist(res.data);
      })
      .catch(error => console.log(error));

    axios.get(`http://localhost:5000/gettopmovie/${id}`)
      .then(res => {
        setMovie(res.data);
        checkWishlist(res.data);
      })
      .catch(error => console.log(error));

  }, [id]);

  // ✅ Check wishlist
  const checkWishlist = (movieData) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some(item => item._id === movieData._id));
  };

  // ✅ Add / Remove wishlist
  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted) {
      wishlist = wishlist.filter(item => item._id !== movie._id);
      setIsWishlisted(false);
    } else {
      wishlist.push(movie);
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  if (!movie) {
    return (
      <div className="loading-player">
        <video src={loadinggif} autoPlay loop muted playsInline />
      </div>
    );
  }

  return (
    <>
      <Navigationbar />

      <div className="player-container">

        {/* POSTER + MOVIE DETAILS */}
        <div className="poster-details-section">
          <img className="poster-big" src={movie.poster} alt={movie.title} />

          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-desc">{movie.description}</p>

          {/* ✅ Wishlist icon + Text */}
          <div className="wishlist-wrapper" onClick={toggleWishlist}>
            <img
              src="https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/618x618/263A.png"
              alt="wishlist"
              className={`wishlist-icon ${isWishlisted ? "active" : ""}`}
            />
            <span className="wishlist-text">
              {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </span>
          </div>
        </div>

        {/* VIDEO PLAYER */}
        <div className="video-section">
          {movie.trailer ? (
            <video src={movie.trailer} controls loop playsInline />
          ) : (
            <video src={loadingVideo} autoPlay loop muted playsInline />
          )}
        </div>

        {/* CAST SECTION */}
        <h3 className="cast-title">Cast</h3>

        <div className="cast-scroll">
          {movie.cast?.map((actor, index) => (
            <div key={index} className="cast-card">
              <img
                src={`https://source.unsplash.com/200x200/?face,person,${index}`}
                alt={actor}
              />
              <p>{actor}</p>
            </div>
          ))}
        </div>
      </div>

      <Footerbar />
    </>
  );
}

export default Playerpage;
