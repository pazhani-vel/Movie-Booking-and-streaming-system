import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

const ShowTimingPage = () => {

  const { movieId, city, lang, theaterName } = useParams(); 
  const [showTimes, setShowTimes] = useState([]);

  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/get_time", {
          params: {
            movieId,
            city,
            lang,
            theater: theaterName
          }
        });
        setShowTimes(res.data.showTimes || []);
        console.log("Showtimes:", res.data.showTimes);
      } catch (err) {
        console.error("Error fetching showtimes:", err);
      }
    };

    fetchShowTimes();
  }, [movieId, city, lang, theaterName]);
  const navigate = useNavigate();

  const handleTimingClick = (time) => {
    navigate(`/seatselection/${movieId}/${city}/${lang}/${theaterName}/${time}`);
  };

  return (
    <div className="p-6">
      <Navigationbar/>
      <div>
        
      </div>
      <h1 className="text-2xl font-bold mb-4" style={{ paddingTop: "10rem" }}>{theaterName}</h1>
      <h2 className="text-lg mb-2">Select a showtime:</h2>
      <div className="flex flex-wrap gap-3">
      
        {showTimes.map((time, idx) => (
          <button
            key={idx}
            onClick={() => handleTimingClick(time)}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-blue-100"
          >
            <li key={idx}> {time} </li>
          </button>

        ))}          
      </div>
      <Footerbar/>
    </div>
  );
};

export default ShowTimingPage;
