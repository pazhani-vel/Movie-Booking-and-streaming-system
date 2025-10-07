// LanguagePage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Navigationbar from "../components/Navbar/Navbar";
import Footerbar from "../components/Footer/Footer";

export default function LanguagePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("");
  const [city, setCity] = useState("");

  

  const cities = ["Chennai","Bangalore"];
  //const countries = ["USA","UK","France","Germany","Japan","Australia","Canada","Singapore", /* add 50 */];

  const handleSearch = () => {
    navigate(`/theatres/${movieId}/${city}/${selectedLang}`);
  };

  return (
    <>
    <Navigationbar/>
    <Container style={{ paddingTop: "10rem" }}>
      <h4>Select Language</h4>
      <Form.Select value={selectedLang} onChange={(e)=>setSelectedLang(e.target.value)} className="mb-3">
        <option value="">-- Select Language --</option>
        <option value="Tamil">Tamil</option>
        <option value="English">English</option>
      </Form.Select>

      {selectedLang && (
        <>
          <Form.Control
            type="text"
            placeholder="Type City or Country"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            className="mb-3"
            list="cities"
          />
          <datalist id="cities">
            {cities.map(c=>(
              <option key={c} value={c}/>
            ))}
          </datalist>

          <Button variant="primary" onClick={handleSearch}>Search Theatres</Button>
        </>
      )}
    </Container>
    <Footerbar/>
    </>
    
  );
}
