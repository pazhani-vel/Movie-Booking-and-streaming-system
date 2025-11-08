import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";
import loadingvideo from "/src/assets/Loading.mp4";
import like from "../assets/like.png";

function BookingPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/booking/${movieId}`);
        setMovie(res.data);
      } catch (err) {}
    };
    fetchMovie();
  }, [movieId]);

  const handleClick = () => {
    if (clicked === false) {
      setLiked(true);
      setClicked(true);
      axios.post(`http://127.0.0.1:5000/likes/${movieId}`);
    }
  };

  const handleBook = () => {
    navigate(`/language/${movieId}`);
  };

  if (!movie) {
    return (
      <center style={{ marginTop: "120px" }}>
        <video src={loadingvideo} autoPlay loop muted width="60%" />
      </center>
    );
  }

  return (
    <>
      <Navigationbar />

      <style>{`
        .booking-page-container{
          min-height:90vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding-top:90px;
          padding-bottom:60px;
          width:100%;
          padding-left:4%;
          padding-right:4%;
        }
        .booking-wrapper{
          display:flex;
          gap:40px;
          width:100%;
          max-width:1400px;
          color:#fff;
        }
        .poster-box{
          width:50%;
          border-radius:14px;
          overflow:hidden;
          box-shadow:0 12px 40px rgba(0,0,0,.45);
        }
        .poster-box img{
          width:100%;
          height:100%;
          object-fit:cover;
        }
        .details-box{
          width:50%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:26px;
          padding:20px;
          background:rgba(15,17,22,.75);
          border-radius:16px;
          backdrop-filter:blur(14px);
        }
        .movie-title{
          font-size:2.6rem;
          font-weight:800;
        }
        .movie-meta{
          font-size:1.2rem;
          color:#c7c7c7;
          line-height:1.6;
        }
        .like-box{
          display:flex;
          align-items:center;
          gap:16px;
        }
        .like-icon{
          width:42px;
          height:42px;
        }
        .like-btn{
          background:#ff0033;
          color:white;
          padding:10px 22px;
          border:none;
          border-radius:8px;
          cursor:pointer;
          font-weight:700;
          transition:.3s;
        }
        .liked{
          background:#00c853;
        }
        .book-btn{
          background:#00e5ff;
          color:black;
          padding:14px;
          width:180px;
          font-size:1.2rem;
          border:none;
          border-radius:10px;
          cursor:pointer;
          font-weight:700;
          transition:.3s;
        }
        .book-btn:hover{
          transform:scale(1.07);
          box-shadow:0 6px 22px rgba(0,229,255,.35);
        }
        @media(max-width:900px){
          .booking-wrapper{flex-direction:column;}
          .poster-box,.details-box{width:100%;}
          .movie-title{font-size:2rem;}
        }
      `}</style>

      <div className="booking-page-container">
        <div className="booking-wrapper">

          <div className="poster-box">
            <img src={movie.poster_url} alt="Movie Poster" />
          </div>

          <div className="details-box">
            <div className="movie-title">{movie.name}</div>

            <div className="movie-meta">
              Rating: ⭐ {movie.rating} <br />
              Likes: ❤️ {movie.likes} <br />
              Language: {movie.language.join(", ")}
            </div>

            <div className="like-box">
              <img src={like} className="like-icon" />
              <button
                onClick={handleClick}
                className={`like-btn ${liked ? "liked" : ""}`}
              >
                {liked ? "Liked" : "Like"}
              </button>
            </div>

            <button className="book-btn" onClick={handleBook}>
              Book Tickets
            </button>
          </div>
        </div>
      </div>

      <Footerbar />
    </>
  );
}

export default BookingPage;
