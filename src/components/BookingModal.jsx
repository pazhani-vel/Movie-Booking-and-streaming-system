import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function BookingModal({ show, onClose, movie }) {
  const [seats, setSeats] = useState(1);

  // Reset seats when modal opens
  useEffect(() => {
    if (show) setSeats(1);
  }, [show]);

  if (!movie) return null;

  const handleBook = () => {
    alert(`Booked ${seats} seat(s) for ${movie.name}`);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Genre:</strong> {movie.genre.join(", ")}</p>
        <p><strong>Language:</strong> {movie.language.join(", ")}</p>
        <p><strong>Rating:</strong> ⭐ {movie.rating} | ❤️ {movie.likes}</p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Number of Seats</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleBook}>Book</Button>
      </Modal.Footer>
    </Modal>
  );
}
