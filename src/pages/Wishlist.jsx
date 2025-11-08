import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const removeMovie = (id) => {
    const updated = wishlist.filter(movie => movie._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <>
      <Navigationbar />

      <div className="wishlist-page-container">
        <h2 className="wishlist-title">⭐ My Wishlist</h2>

        {wishlist.length === 0 && (
          <p className="empty-wishlist">No movies added to wishlist yet.</p>
        )}

        <div className="wishlist-grid">
          {wishlist.map((movie) => (
            <div key={movie._id} className="wishlist-card">

              <img src={movie.poster} alt={movie.title} className="wish-img" />

              <h3 className="wish-name">{movie.title}</h3>

              <div className="wish-buttons">
                <Link to={`/get/${movie._id}`} className="wish-view-btn">
                  ▶ Watch
                </Link>
                <button className="wish-remove-btn" onClick={() => removeMovie(movie._id)}>
                  ❌ Remove
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      <Footerbar />
    </>
  );
}

export default Wishlist;
