import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search movies..."
        className="me-2"
        style={{ width: "250px", borderRadius: "20px" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        variant="outline-dark"
        style={{ borderRadius: "20px" }}
      >
        Search
      </Button>
    </Form>
  );
}
