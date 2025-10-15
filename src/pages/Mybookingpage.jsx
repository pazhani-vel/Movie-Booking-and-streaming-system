import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./MyBookings.css";
import { UserContext } from "../context/UserContext";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Get userId from localStorage
  const {user}=useContext(UserContext)

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/bookedseat/${user.email}`)
        .then((res) =>{
          console.log(user);
          setBookings(res.data);
          console.log(res.data)
    })
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user]);

  if (!user) {
    return <p className="no-user">Please wait</p>;
  }

  return (
    <div className="my-bookings-page">
      <Navigationbar/>
      <h2 className="page-title" style={{ paddingTop: "10rem" }}>🎟️ My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">You have no bookings yet.</p>
      ) : (
        <div className="cards-container">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <img
                src={b.poster}
                alt={b.movieTitle || "Movie Poster"}
                className="movie-poster"
              />
              <div className="card-details">
                <h3 className="movie-title">{b.movieTitle || "Unknown Movie"}</h3>
                <p>
                  <strong>Theatre:</strong> {b.theaterName}
                </p>
                <p>
                  <strong>City:</strong> {b.city} | <strong>Language:</strong>{" "}
                  {b.language}
                </p>
                <p>
                  <strong>Timing:</strong> {b.timing}
                </p>
                <p>
                  <strong>Seats:</strong>{" "}
                  {b.seats.map((s, i) => s.seatNo || `Seat-${i + 1}`).join(", ")}
                </p>
                <p className="booking-time">
                  Booked on:{" "}
                  {b.seats[0]?.bookingTime
                    ? new Date(b.seats[0].bookingTime).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footerbar/>
    </div>
  );
};

export default MyBookings;
