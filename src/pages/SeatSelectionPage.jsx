import React, { useState, useEffect, useContext } from "react";
import SeatGrid from "../components/SeatGrid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatAudienceMap, setSeatAudienceMap] = useState({});
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { movieId, city, lang, theaterName, timing } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookedSeats", {
        params: { movieId, city, language: lang, theaterName, timing }
      })
      .then((res) => setBookedSeats(res.data))
      .catch((err) => console.error(err));
  }, [movieId, city, lang, theaterName, timing]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      const updatedMap = { ...seatAudienceMap };
      delete updatedMap[seat];
      setSeatAudienceMap(updatedMap);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleAudienceChange = (seat, type) => {
    setSeatAudienceMap({ ...seatAudienceMap, [seat]: type });
  };

  const handleBooking = async () => {
    const allSeatsHaveType = selectedSeats.every((seat) => seatAudienceMap[seat]);
    if (!allSeatsHaveType) return alert("Select audience type for all seats.");

    try {
      await axios.post("http://localhost:5000/api/bookSeats", {
        userId: user.email,
        movieId,
        city,
        language: lang,
        theaterName,
        timing,
        seats: selectedSeats.map((seat) => ({ seat, type: seatAudienceMap[seat] }))
      });

      alert("Seats booked successfully!");
      navigate(`/mybookingpage`);
    } catch (err) {
      alert(err.response?.data?.message || "Some seats already booked");
    }

    try {
      await axios.post("http://localhost:5000/sendmail", {
        userId: user.email,
        movieId,
        city,
        language: lang,
        theaterName,
        timing,
        seats: selectedSeats.map((seat) => ({ seat, type: seatAudienceMap[seat] }))
      });
    } catch (err) {}
  };

  return (
    <>
      <Navigationbar />

      <style>{`
        .seat-page-container{
          padding-top:120px;
          padding-bottom:80px;
          width:100%;
          min-height:86vh;
          color:white;
          display:flex;
          flex-direction:column;
          align-items:center;
        }
        .page-title{
          font-size:2rem;
          font-weight:800;
          margin-bottom:20px;
          border-left:4px solid #00e5ff;
          padding-left:14px;
          text-shadow:0 0 18px rgba(0,229,255,.3);
        }
        .seat-grid-wrapper{
          background:rgba(15,17,22,.75);
          padding:30px;
          border-radius:18px;
          backdrop-filter:blur(14px);
          box-shadow:0 12px 40px rgba(0,0,0,.45);
        }
        .audience-box{
          margin-top:26px;
          width:100%;
          max-width:500px;
          background:white;
          border-radius:12px;
          padding:16px;
          color:black;
        }
        .audience-box label{
          cursor:pointer;
          padding:6px;
          font-size:1rem;
        }
        .audience-row{
          display:flex;
          gap:14px;
          margin-top:6px;
        }
        .book-btn{
          margin-top:20px;
          background:#00e5ff;
          padding:14px 22px;
          font-weight:700;
          font-size:1.2rem;
          border-radius:10px;
          border:none;
          color:black;
          cursor:pointer;
          transition:.25s;
        }
        .book-btn:hover{
          transform:scale(1.07);
          box-shadow:0 0 22px rgba(0,229,255,.4);
        }
      `}</style>

      <div className="seat-page-container">
        <div className="page-title">
          {theaterName} – {timing}
        </div>

        <div className="seat-grid-wrapper">
          <SeatGrid
            selectedSeats={selectedSeats}
            bookedSeats={bookedSeats}
            onSeatClick={handleSeatClick}
          />
        </div>

        {selectedSeats.length > 0 && (
          <div className="audience-box">
            <h4>Select Audience Type for Each Seat:</h4>

            {selectedSeats.map((seat) => (
              <div key={seat}>
                <strong>{seat}</strong>
                <div className="audience-row">
                  {["Adult", "Child", "Senior", "Ladies"].map((type) => (
                    <label key={type}>
                      <input
                        type="radio"
                        name={seat}
                        value={type}
                        checked={seatAudienceMap[seat] === type}
                        onChange={() => handleAudienceChange(seat, type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className="book-btn"
        >
          Book {selectedSeats.length > 0 && `(${selectedSeats.length})`}
        </button>
      </div>

      <Footerbar />
    </>
  );
};

export default SeatSelectionPage;
