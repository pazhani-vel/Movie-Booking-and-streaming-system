import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

export default function LanguagePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("");
  const [city, setCity] = useState("");
  const cities = ["Chennai", "Bangalore"];

  const handleSearch = () => {
    navigate(`/theatres/${movieId}/${city}/${selectedLang}`);
  };

  return (
    <>
      <Navigationbar />

      <style>{`
        .language-container{
          padding-top:120px;
          min-height:80vh;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          color:white;
        }
        .language-card{
          background:rgba(15,17,22,.75);
          padding:40px;
          width:420px;
          border-radius:16px;
          backdrop-filter:blur(14px);
          text-align:center;
          box-shadow:0 12px 40px rgba(0,0,0,.45);
        }
        .language-card h4{
          font-size:1.8rem;
          margin-bottom:20px;
        }
        .language-select,
        .city-input{
          background:#1b1f27;
          color:white;
          width:100%;
          border:none;
          padding:14px;
          font-size:1rem;
          margin-bottom:18px;
          border-radius:10px;
          outline:none;
        }
        .language-select:focus,
        .city-input:focus{
          box-shadow:0 0 12px #00e5ff;
        }
        .search-btn{
          background:#00e5ff;
          border:none;
          padding:14px;
          width:100%;
          font-size:1.2rem;
          font-weight:700;
          border-radius:10px;
          cursor:pointer;
          transition:.3s;
        }
        .search-btn:hover{
          transform:scale(1.07);
          box-shadow:0 6px 22px rgba(0,229,255,.35);
        }
        @media(max-width:520px){
          .language-card{width:90%}
        }
      `}</style>

      <div className="language-container">
        <div className="language-card">
          <h4>Select Language</h4>

          <select
            className="language-select"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            <option value="">-- Select Language --</option>
            <option value="Tamil">Tamil</option>
            <option value="English">English</option>
          </select>

          {selectedLang && (
            <>
              <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                list="cities"
                className="city-input"
              />
              <datalist id="cities">
                {cities.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>

              <button className="search-btn" onClick={handleSearch}>
                Search Theatres
              </button>
            </>
          )}
        </div>
      </div>

      <Footerbar />
    </>
  );
}
