import React from "react";
import { useNavigate } from "react-router-dom";

const TheatreCard = ({ theatre }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/showtimings", { state: { theatre } });
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border rounded-lg shadow-md cursor-pointer transition-colors ${
        theatre.occupancy === "full"
          ? "bg-red-200"
          : theatre.occupancy === "medium"
          ? "bg-yellow-200"
          : "bg-white"
      }`}
    >
      <h2 className="text-lg font-semibold">{theatre.name}</h2>
      <p className="text-sm text-gray-600">{theatre.format}</p>
      <p className="text-sm text-gray-600">
        Showtimes: {theatre.timings.join(", ")}
      </p>
    </div>
  );
};

export default TheatreCard;
