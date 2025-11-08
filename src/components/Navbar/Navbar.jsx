import React from "react";
import "./Navbar.css";
import icon from "/src/assets/Webicon.jpeg";
import { Link } from "react-router-dom";

function Navigationbar() {
  return (
    <header className="nav-container">

      {/* LEFT - LOGO */}
      <div className="nav-left">
        <img src={icon} alt="logo" className="brand-logo" />
        <span className="brand-name">MovieVerse</span>
      </div>

      {/* CENTER MENU */}
      <nav className="nav-links">

        <Link to="/home" className="nav-item">
          <img
            src="https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/home/fill1/48px.svg"
            className="navIcon"
            alt="home"
          />
          <span>Home</span>
        </Link>

        <Link to="/TicketBookingpage" className="nav-item">
          <img
            src="https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/movie/fill1/48px.svg"
            className="navIcon"
            alt="ticket booking"
          />
          <span>Ticket Booking</span>
        </Link>

        <Link to="/mybookingpage" className="nav-item">
          <img
            src="https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/playlist_add_check_circle/fill1/48px.svg"
            className="navIcon"
            alt="my booking"
          />
          <span>My Booking</span>
        </Link>

        {/* ✅ New Wishlist Option */}
        <Link to="/wishlist" className="nav-item">
          <img
            src="https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/618x618/263A.png"
            className="navIcon wishlistIcon"
            alt="wishlist"
          />
          <span>Wishlist</span>
        </Link>

      </nav>

      {/* RIGHT - SIGN OUT */}
      <div className="nav-right">
        <Link to="/" className="signout-btn">
          <img
            src="https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/logout/fill1/48px.svg"
            alt="logout"
          />
          <span>Sign out</span>
        </Link>
      </div>

    </header>
  );
}

export default Navigationbar;
