import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favourite.css";

import hindi from "../assets/Favourite/hindi.jpg";
import english from "../assets/Favourite/english.jpeg";
import tamil from "../assets/Favourite/tamil.jpeg";
import telugu from "../assets/Favourite/telugu.jpeg";
import malayalam from "../assets/Favourite/malayalam.jpg";
import bengali from "../assets/Favourite/bengali.jpg";
import marathi from "../assets/Favourite/marathi.jpg";
import kannada from "../assets/Favourite/kannada.jpg";

const languages = [
  { id: 1, native: "हिंदी", eng: "Hindi", img: hindi },
  { id: 2, native: "English", eng: "English", img: english },
  { id: 3, native: "தமிழ்", eng: "Tamil", img: tamil },
  { id: 4, native: "తెలుగు", eng: "Telugu", img: telugu },
  { id: 5, native: "മലയാളം", eng: "Malayalam", img: malayalam },
  { id: 6, native: "বাংলা", eng: "Bengali", img: bengali },
  { id: 7, native: "मराठी", eng: "Marathi", img: marathi },
  { id: 8, native: "ಕನ್ನಡ", eng: "Kannada", img: kannada },
];

export default function Favourite() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleHeart = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      alert("Please select at least one language.");
      return;
    }

    navigate("/profile", {
      state: { selectedLanguages: selected },
    });
  };

  return (
    <div className="fav-container">
      <h2>Build Your Home Page</h2>
      <p className="subtext">🎧 Choose your favourite languages</p>

      <div className="grid">
        {languages.map((lang) => (
          <div
            className="fav-card"
            key={lang.id}
            onClick={() => toggleHeart(lang.id)} 
          >
            <div className="overlay"></div>
            <img src={lang.img} alt={lang.eng} />

            <div className="text">
              <h3>{lang.native}</h3>
              <p>{lang.eng}</p>
            </div>

            {/* ❤️ HEART TOGGLE */}
            <svg
              className={`heart ${selected.includes(lang.id) ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();               // ✅ Prevents double toggle
                toggleHeart(lang.id);
              }}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      <button className="continue" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
