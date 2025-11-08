import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BookingConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { theatre, time, selectedSeats = [], seatAudienceMap = {} } = state || {};

  if (!theatre || !time) {
    return (
      <div style={{ color: "white", paddingTop: "140px", textAlign: "center" }}>
        No booking details found.
      </div>
    );
  }

  const totalPrice = selectedSeats.reduce((total, seat) => {
    const type = seatAudienceMap[seat];
    const price = type === "Child" ? 150 : 200;
    return total + price;
  }, 0);

  return (
    <>
      <style>{`
        .confirm-container{
          padding-top:120px;
          width:100%;
          min-height:85vh;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          color:white;
        }
        .confirm-card{
          width:420px;
          background:rgba(15,17,22,.8);
          border-radius:16px;
          padding:32px;
          backdrop-filter:blur(14px);
          box-shadow:0 8px 30px rgba(0,0,0,.45);
          text-align:center;
        }
        .confirm-title{
          font-size:2rem;
          font-weight:800;
          margin-bottom:10px;
          color:#00e5ff;
          text-shadow:0 0 18px rgba(0,229,255,.3);
        }
        .confirm-line{
          font-size:1.1rem;
          margin-bottom:6px;
          opacity:.85;
        }
        .seat-block{
          margin-top:16px;
          border-radius:12px;
          background:white;
          color:black;
          padding:12px;
          font-size:.95rem;
        }
        .total-price{
          margin-top:20px;
          font-size:1.4rem;
          font-weight:800;
          color:#00e5ff;
        }
        .done-btn{
          margin-top:26px;
          width:100%;
          padding:12px;
          border:none;
          border-radius:10px;
          background:#00e5ff;
          font-size:1.2rem;
          font-weight:700;
          cursor:pointer;
          transition:.25s;
        }
        .done-btn:hover{
          transform:scale(1.08);
          box-shadow:0 0 22px rgba(0,229,255,.4);
        }
      `}</style>

      <div className="confirm-container">
        <div className="confirm-card">
          <div className="confirm-title">Booking Confirmed ✅</div>

          <div className="confirm-line">
            <strong>Theatre:</strong> {theatre}
          </div>
          <div className="confirm-line">
            <strong>Showtime:</strong> {time}
          </div>

          <div className="seat-block">
            {selectedSeats.map((seat) => (
              <div key={seat}>
                Seat {seat} → {seatAudienceMap[seat]}
              </div>
            ))}
          </div>

          <div className="total-price">Total Amount: ₹{totalPrice}</div>

          <button
            className="done-btn"
            onClick={() => navigate("/")}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmationPage;
