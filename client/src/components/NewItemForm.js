import React, { useState } from "react";
import "../styles.css";
import useFocus from "../hooks/useFocus";

export const NewItemForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleAddText = (event) => {
    if (event.key === "Enter") onAdd(text);
  };

  return (
    <div className="newItemFormContainer">
      <input
        ref={inputRef}
        type="text"
        className="newItemInput"
        value={text}
        onKeyPress={handleAddText}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="newItemButton" onClick={() => onAdd(text)}>
        Create
      </button>
    </div>
  );
};
