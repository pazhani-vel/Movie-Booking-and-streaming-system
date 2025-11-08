import React from "react";
import not_available_poster from "/Backend/static/poster_not_available.png";

function MovieCard({ name, genre, language, rating, like, onClick, poster }) {
  if (!name) return null;

  return (
    <>
      <style>{`
        .movieCardContainer{width:100%;height:350px;border-radius:14px;overflow:hidden;position:relative;cursor:pointer;transition:.3s;box-shadow:0 8px 22px rgba(0,0,0,.5)}
        .movieCardContainer:hover{transform:translateY(-8px) scale(1.05);box-shadow:0 12px 40px rgba(0,229,255,.25)}
        .cardPoster{width:100%;height:100%;object-fit:cover;filter:brightness(70%);transition:.3s}
        .movieCardContainer:hover .cardPoster{filter:brightness(45%) blur(1px)}
        .hoverOverlay{position:absolute;bottom:0;width:100%;height:100%;background:linear-gradient(to top,rgba(0,0,0,.9),rgba(0,0,0,.3));opacity:0;padding:16px;transition:.3s;display:flex;flex-direction:column;justify-content:flex-end;color:white}
        .movieCardContainer:hover .hoverOverlay{opacity:1}
        .hoverOverlay h3{font-size:1.2rem;font-weight:800;margin:0}
        .hoverOverlay p{font-size:.9rem;margin:1px 0;color:#bdc6d4}
        .playButton{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(.7);font-size:3rem;color:white;opacity:0;transition:.3s}
        .movieCardContainer:hover .playButton{opacity:1;transform:translate(-50%,-50%) scale(1)}
      `}</style>

      <div className="movieCardContainer" onClick={onClick}>
        <img src={poster || not_available_poster} alt="poster" className="cardPoster" />
        <div className="hoverOverlay">
          <span className="playButton">▶</span>
          <h3>{name}</h3>
          <p>{genre} • {language}</p>
          <p>⭐ {rating} | ❤️ {like}</p>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
