import React, { useState } from "react";
import "../styles.css";
import { NewItemForm } from "./NewItemForm";

export const AddNewItem = (props) => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;
  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <button
      className="addItemButton"
      style={{ color: { dark } }}
      onClick={() => setShowForm(true)}
    >
      {toggleButtonText}
    </button>
  );
};
