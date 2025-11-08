import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

export default function TheatrePage() {
  const navigate = useNavigate();
  const { movieId, city, lang } = useParams();
  const [theatres, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/theaters", {
          params: { movieId, city, lang }
        });
        setTheaters(res.data);
      } catch (err) {}
    };
    fetchTheaters();
  }, [movieId, city, lang]);

  const handleSelectTheatre = (theatre) => {
    navigate(`/showtiming/${movieId}/${city}/${lang}/${encodeURIComponent(theatre.name)}`);
  };

  return (
    <>
      <Navigationbar />

      <style>{`
        .theatre-container{
          padding-top:120px;
          width:100%;
          min-height:85vh;
          display:flex;
          flex-direction:column;
          align-items:center;
          padding-bottom:60px;
        }
        .theatre-title{
          font-size:2rem;
          color:white;
          font-weight:700;
          margin-bottom:26px;
          border-left:4px solid #00e5ff;
          padding-left:14px;
          text-shadow:0 0 18px rgba(0,229,255,.4);
          width:90%;
          max-width:1400px;
        }
        .theatre-grid{
          width:90%;
          max-width:1400px;
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
          gap:24px;
        }
        .theatre-card{
          background:rgba(15,17,22,.75);
          border-radius:15px;
          padding:24px;
          box-shadow:0 8px 25px rgba(0,0,0,.45);
          display:flex;
          flex-direction:column;
          gap:14px;
          transition:.3s;
          color:white;
        }
        .theatre-card:hover{
          transform:translateY(-7px);
          box-shadow:0 12px 38px rgba(0,229,255,.25);
        }
        .theatre-name{
          font-size:1.35rem;
          font-weight:700;
        }
        .select-btn{
          background:#00e5ff;
          color:black;
          padding:12px;
          border:none;
          border-radius:8px;
          font-size:1.1rem;
          font-weight:700;
          cursor:pointer;
          transition:.25s;
        }
        .select-btn:hover{
          transform:scale(1.07);
          box-shadow:0 6px 22px rgba(0,229,255,.4);
        }
        @media(max-width:580px){
          .theatre-title{font-size:1.6rem}
        }
      `}</style>

      <div className="theatre-container">
        <div className="theatre-title">🎭 Available Theatres</div>

        <div className="theatre-grid">
          {theatres.map((t) => (
            <div key={t.name} className="theatre-card">
              <div className="theatre-name">{t.name}</div>
              <button className="select-btn" onClick={() => handleSelectTheatre(t)}>
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footerbar />
    </>
  );
}
