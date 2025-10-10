
import React, { useState, useEffect, useContext } from "react";
import SeatGrid from "../components/SeatGrid";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";


const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatAudienceMap, setSeatAudienceMap] = useState({});
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();

  const {user}=useContext(UserContext)

  const { movieId, city, lang, theaterName, timing } = useParams();
  //const user = JSON.parse(localStorage.getItem("user")); // logged-in user

  // Fetch already booked seats on page load
  useEffect(() => {
    axios.get("http://localhost:5000/api/bookedSeats", {
      params: { movieId, city, language: lang, theaterName, timing }
    }).then(res => setBookedSeats(res.data))
      .catch(err => console.error(err));
  }, [movieId, city, lang, theaterName, timing]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
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
    const allSeatsHaveType = selectedSeats.every(seat => seatAudienceMap[seat]);
    if (!allSeatsHaveType) {
      alert("Please select audience type for all seats.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookSeats", {
        userId: user.email,
        movieId,
        city,
        language: lang,
        theaterName,
        timing,
        seats: selectedSeats.map(seat => ({ seat, type: seatAudienceMap[seat] }))
      });
      console.log("Booking successful");

      alert("Seats booked successfully!");
      navigate(`/mybookingpage`)
    } catch (err) {
      alert(err.response.data.message || "Some seats are already booked");
    }
  };

  return (
    <>
    <Navigationbar/>
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-white" style={{ paddingTop: "10rem" }}>
        {theaterName} – {timing}
      </h2>

      <div className="p-4 bg-gray-800 rounded-lg">
        <SeatGrid
          selectedSeats={selectedSeats}
          bookedSeats={bookedSeats}
          onSeatClick={handleSeatClick}
        />
      </div>

      {selectedSeats.length > 0 && (
        <div className="mt-8 w-full max-w-md p-4 bg-gray-100 rounded-lg">
          <h4 className="mb-4 font-semibold text-black">
            Select Audience Type for Each Seat:
          </h4>
          {selectedSeats.map(seat => (
            <div key={seat} className="mb-3 p-3 border rounded bg-white text-black">
              <strong>{seat}</strong>
              <div className="flex gap-4 mt-2">
                {["Adult", "Child", "Senior", "Ladies"].map(type => (
                  <label key={type} className="flex items-center gap-1">
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

      <Button
        type="button"
        variant="primary"
        onClick={handleBooking}
        disabled={selectedSeats.length === 0}
        className="px-6 py-2 rounded disabled:bg-blue-500 disabled:opacity-70 mt-6"
      >
        Book {selectedSeats.length > 0 && `(${selectedSeats.length})`}
      </Button>
    </div>
    <Footerbar/>
    </>
  );
};

export default SeatSelectionPage;