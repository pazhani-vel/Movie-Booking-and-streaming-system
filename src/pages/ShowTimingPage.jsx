import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

const ShowTimingPage = () => {
  const { movieId, city, lang, theaterName } = useParams();
  const [showTimes, setShowTimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/get_time", {
          params: { movieId, city, lang, theater: theaterName }
        });
        setShowTimes(res.data.showTimes || []);
      } catch (err) {}
    };
    fetchShowTimes();
  }, [movieId, city, lang, theaterName]);

  const handleTimingClick = (time) => {
    navigate(`/seatselection/${movieId}/${city}/${lang}/${theaterName}/${time}`);
  };

  return (
    <>
      <Navigationbar />

      <style>{`
        .showtime-container{
          padding-top:120px;
          padding-bottom:80px;
          width:100%;
          min-height:85vh;
          display:flex;
          flex-direction:column;
          align-items:center;
          color:white;
        }
        .showtime-header{
          width:90%;
          max-width:1400px;
          font-size:2rem;
          font-weight:800;
          margin-bottom:20px;
          border-left:4px solid #00e5ff;
          padding-left:14px;
          text-shadow:0 0 20px rgba(0,229,255,.3);
        }
        .showtime-sub{
          width:90%;
          max-width:1400px;
          font-size:1.2rem;
          opacity:.8;
          margin-bottom:20px;
        }
        .timing-grid{
          width:90%;
          max-width:1400px;
          display:flex;
          flex-wrap:wrap;
          gap:18px;
        }
        .timing-card{
          padding:14px 22px;
          background:rgba(255,255,255,0.9);
          color:black;
          font-size:1.2rem;
          font-weight:700;
          border-radius:12px;
          cursor:pointer;
          transition:.25s;
          border:none;
        }
        .timing-card:hover{
          background:#00e5ff;
          color:black;
          transform:scale(1.08);
          box-shadow:0 6px 22px rgba(0,229,255,.35);
        }
      `}</style>

      <div className="showtime-container">

        <div className="showtime-header">{theaterName}</div>
        <div className="showtime-sub">Choose showtime</div>

        <div className="timing-grid">
          {showTimes.map((time, idx) => (
            <button key={idx} className="timing-card" onClick={() => handleTimingClick(time)}>
              {time}
            </button>
          ))}
        </div>
      </div>

      <Footerbar />
    </>
  );
};

export default ShowTimingPage;
