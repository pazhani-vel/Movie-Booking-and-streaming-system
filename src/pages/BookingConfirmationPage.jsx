import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BookingConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { theatre, time, selectedSeats = [], seatAudienceMap = {} } = state || {};

  if (!theatre || !time) {
    return <p className="text-center mt-10">No booking details found.</p>;
  }

  // Calculate total price based on audience type per seat
  const totalPrice = selectedSeats.reduce((total, seat) => {
    const type = seatAudienceMap[seat];
    const price = type === "Child" ? 150 : 200; // You can add other types if needed
    return total + price;
  }, 0);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>
      <p className="mb-2">Theatre: {theatre.name}</p>
      <p className="mb-2">Showtime: {time}</p>
      <p className="mb-4 font-semibold">Seats and Audience Type:</p>
      
      {selectedSeats.map((seat) => (
        <p key={seat}>
          Seat {seat}: {seatAudienceMap[seat]}
        </p>
      ))}

      <p className="mb-4 font-semibold">Total Price: ₹{totalPrice}</p>

      <Button variant="primary" onClick={() => navigate("/")}>
        Done
      </Button>
    </div>
  );
};

export default BookingConfirmationPage;
