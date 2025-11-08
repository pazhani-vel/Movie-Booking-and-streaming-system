import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/bookedseat/${user.email}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ color: "white", fontSize: "1.5rem", padding: "150px" }}>
        Please wait...
      </div>
    );
  }

  return (
    <>
      <Navigationbar />

      <style>{`
        .myBookingsContainer{
          padding-top:120px;
          min-height:85vh;
          width:100%;
          color:white;
          display:flex;
          flex-direction:column;
          align-items:center;
        }
        .myBookingsTitle{
          font-size:2rem;
          font-weight:800;
          border-left:4px solid #00e5ff;
          padding-left:14px;
          text-shadow:0 0 18px rgba(0,229,255,.3);
          margin-bottom:26px;
        }
        .myBookingsGrid{
          width:92%;
          max-width:1500px;
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(310px,1fr));
          gap:30px;
        }
        .bookingCard{
          background:rgba(15,17,22,.75);
          border-radius:16px;
          display:flex;
          flex-direction:column;
          overflow:hidden;
          box-shadow:0 8px 28px rgba(0,0,0,.45);
          transition:.3s;
        }
        .bookingCard:hover{
          transform:translateY(-6px);
          box-shadow:0 12px 36px rgba(0,229,255,.35);
        }
        .bookingPoster{
          width:100%;
          height:240px;
          object-fit:cover;
        }
        .bookingDetails{
          padding:18px;
          display:flex;
          flex-direction:column;
          gap:6px;
        }
        .movieName{
          font-size:1.35rem;
          font-weight:800;
          margin-bottom:4px;
        }
        .bookingInfo{
          font-size:1rem;
          color:#c7c7c7;
        }
        .bookingOn{
          margin-top:6px;
          font-size:.9rem;
          color:#00e5ff;
        }
        .noBooking{
          color:white;
          font-size:1.8rem;
          margin-top:100px;
        }
      `}</style>

      <div className="myBookingsContainer">
        <div className="myBookingsTitle">🎟️ My Bookings</div>

        {bookings.length === 0 ? (
          <div className="noBooking">You have no bookings yet.</div>
        ) : (
          <div className="myBookingsGrid">
            {bookings.map((b) => (
              <div key={b._id} className="bookingCard">
                <img
                  src={b.poster}
                  alt="Movie Poster"
                  className="bookingPoster"
                />

                <div className="bookingDetails">
                  <div className="movieName">{b.movieTitle || "Unknown Movie"}</div>

                  <div className="bookingInfo">
                    <strong>Theatre:</strong> {b.theaterName}
                  </div>

                  <div className="bookingInfo">
                    <strong>City:</strong> {b.city} | <strong>Language:</strong> {b.language}
                  </div>

                  <div className="bookingInfo">
                    <strong>Timing:</strong> {b.timing}
                  </div>

                  <div className="bookingInfo">
                    <strong>Seats:</strong>{" "}
                    {b.seats.map((s, i) => s.seatNo || `Seat-${i + 1}`).join(", ")}
                  </div>

                  <div className="bookingOn">
                    Booked on: {b.seats[0]?.bookingTime
                      ? new Date(b.seats[0].bookingTime).toLocaleString()
                      : "N/A"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footerbar />
    </>
  );
};

export default MyBookings;
