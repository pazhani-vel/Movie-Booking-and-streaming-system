import React from "react";
import { Button } from "react-bootstrap";

export default function LanguageSelector({ languages, selected, onSelect }) {
  return (
    <div className="mb-3">
      {languages.map(lang => (
        <Button
          key={lang}
          variant={selected === lang ? "success":"secondary"}
          className="me-2 mb-2"
          onClick={()=>onSelect(lang)}
        >
          {lang}
        </Button>
      ))}
    </div>
  );
}
