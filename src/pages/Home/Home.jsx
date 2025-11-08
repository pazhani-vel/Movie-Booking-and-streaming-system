import React, { useState, useEffect } from "react";
import "./Home.css";
import Navigationbar from "../../components/Navbar/Navbar";
import banner_image from "/src/assets/Bannerimage.jpg";
import Footerbar from "../../components/Footer/Footer";
import Card from "../Card/Card";
import loadingVideo from "/src/assets/Loading.mp4";

function Home() {
  const [Cards, setcard] = useState(null);
  const [TopMovieCards, settopmoviecard] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/get")
      .then((item) => item.json())
      .then((item) => setcard(item))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/gettopmovie")
      .then((item) => item.json())
      .then((item) => settopmoviecard(item))
      .catch((error) => console.log(error));
  }, []);

  if (Cards == null || TopMovieCards == null) {
    return (
      <>
        <div className="loading">
          <video src={loadingVideo} autoPlay loop muted playsInline />
        </div>
      </>
    );
  }

  return (
    <>
      <Navigationbar />

      {/* HERO / BANNER */}
      <section className="Banner">
        <img src={banner_image} alt="Banner" className="Bannerimage" />

        <div className="Banner_caption">
          <h1>Spider-Man: New Brand Day</h1>
          <p>Coming Soon...</p>
          <h2>🔥 Unlimited Movies. Infinite Emotions.</h2>
        </div>
      </section>

      {/* TOP MOVIES CAROUSEL */}
      <section className="card container">
        <h2>Top Movies</h2>
        <div className="card-list">
          {TopMovieCards.map((movie) => (
            <Card
              key={movie._id}
              id={movie._id}
              name={movie.title}
              genre={movie.genre}
              poster={movie.poster}
            />
          ))}
        </div>
      </section>

      {/* ALL MOVIES */}
      <section className="card container">
        <h2>Movies</h2>
        <div className="card-list">
          {Cards.map((movie) => (
            <Card
              key={movie._id}
              id={movie._id}
              name={movie.title}
              genre={movie.genre}
              poster={movie.poster}
            />
          ))}
        </div>
      </section>

      <Footerbar />
    </>
  );
}

export default Home;