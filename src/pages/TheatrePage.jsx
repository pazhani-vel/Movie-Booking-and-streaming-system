import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

export default function TheatrePage() {
  const navigate = useNavigate();

  const { movieId, city, lang } = useParams();
  console.log("useParams:", movieId, city, lang); 
  const [theatres, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/theaters", {
          params: { movieId, city, lang } // send as query params to backend
        });
        setTheaters(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching theaters:", err);
      }
    };

    fetchTheaters();
  }, [movieId, city, lang]);

  const theatress = Array.from({ length: 50 }, (_, i) => ({
    name: `Theatre${i + 1}`,
    format: ["IMAX", "Dolby", "3DX", "4DX", "PLF", "2D"][i % 6],
    occupancy: Math.floor(Math.random() * 100),
    timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
  }));

  const getColor = (occ) =>
    occ >= 100 ? "#ffcccc" : occ >= 60 ? "#ffff99" : "#ffffff";

  const handleSelectTheatre = (theatre) => {
    navigate(`/showtiming/${movieId}/${city}/${lang}/${encodeURIComponent(theatre.name)}`);
  };

  return (
    <>
    <Navigationbar/>
    <Container style={{ paddingTop: "10rem" }}>
      <Row>
        {theatres.map((t) => (
          <Col md={4} className="mb-3" key={t.name}>
            <Card style={{ backgroundColor: getColor(t.occupancy) }}>
              <Card.Body>
                <Card.Title>{t.name}</Card.Title>
                {/* <Card.Text>Format: {t.format}</Card.Text>
                <Card.Text>Occupancy: {t.occupancy}%</Card.Text> */}
                <Button
                  variant="primary"
                  onClick={() => handleSelectTheatre(t)}
                >
                  Select
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Footerbar/>
    </>
    
  );
}
