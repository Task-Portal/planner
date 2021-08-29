import React, { useState, useEffect } from "react";
import { create, list } from "./apiBoard";
import { isAuthenticated } from "../../auth";
import Board from "./Board";
import { AddNewItem } from "../AddNewItem";
import "../../styles.css";

const UserBoards = () => {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, token } = isAuthenticated();

  useEffect(() => {
    list({ userId: user._id }, { t: token }).then((data) => {
      if (data?.error) {
        setError(data.error);
      } else {
        setError("");
        setBoards(data);
        setSuccess("");
      }
    });
  }, []);

  const onAdd = (text) => {
    if (text.trim()) {
      create(
        { userId: user._id },
        { t: token },
        { name: text, owner: user._id }
      ).then((result) => {
        if (result?.error) {
          setError(result.error);
        } else {
          const { data } = result;
          const b = [...boards];
          b.push(data);
          setBoards(b);
        }
      });
    }
  };

  return (
    <>
      <div className="appContainer">
        {boards &&
          boards.map((board, i) => {
            return <Board board={board} key={i} />;
          })}

        <AddNewItem toggleButtonText="+Add another listTasks" onAdd={onAdd} />
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
      </div>
    </>
  );
};

export default UserBoards;
