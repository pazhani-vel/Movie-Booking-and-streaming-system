import React, { useState, useEffect } from "react";
import './Playerpage.css';
import { useParams } from "react-router-dom";
import axios from 'axios';
import loadinggif from '/src/assets/Loading.mp4';
import loadingVideo from '/src/assets/loadingVideo.mp4';
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

function Playerpage() {
  const { id } = useParams();
  const [movie, setmovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/get/${id}`)
      .then(res => setmovie(res.data))
      .catch(error => console.log(error));
  }, [id]);

   useEffect(() => {
    axios.get(`http://localhost:5000/gettopmovie/${id}`)
      .then(res => setmovie(res.data))
      .catch(error => console.log(error));
  }, [id]);

  if (movie === null) {
    return (
      <div className="loading">
        <video
          src={loadinggif}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "60vw", height: "60vh" }}
        />
      </div>
    );
  }

  return (
    <>
    <Navigationbar/>
    <div className="play-container">


      <div className="container mt-5 mb-5 pt-5 pb-5">
      <center>
         <h2 className="title">{movie.title}</h2>
        <div  className="video-player">
        {movie.trailer ? (
  <video
    src={movie.trailer}
    loop
    controls
    playsInline
    style={{ width: "60vw", height: "60vh" }}
  />
) : (
  <video
    src={loadingVideo}
    autoPlay
    loop
    muted
    playsInline
    style={{ width: "60vw", height: "60vh" }}
  />
)}
      </div>
      </center>

      <div className="row align-items-center box">
        
        <div className="col-md-4">
          <div className="left-box">
            <img
            src={movie.poster}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
          </div>
        </div>

        <div className="col-md-8">
          <div className="right-box">
            <h1 className="title-box">{movie.title}</h1>
          <h4>Description:</h4>
          <p>{movie.description}</p>

          <h4>Cast:</h4>
          <ul>
            {movie.cast?.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
          </div>
        </div>

      </div>
      
    </div>

    </div>
    <Footerbar/>
    </>
  );
}

export default Playerpage;