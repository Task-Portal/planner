import React, { useEffect, useState } from "react";
import "../../styles.css";
import { Link } from "react-router-dom";
import Task from "../task/Task";
import { Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import { create, listTasks, updateManyTasks } from "../task/apiTask";
import { isAuthenticated } from "../../auth";

const Board = ({ board }) => {
  const [tasks, setTasks] = useState();

  //Todo not used
  const [error, setError] = useState("");
  const { user, token } = isAuthenticated();

  useEffect(() => {
    listTasks({ boardId: board._id, userId: user._id }, { t: token }).then(
      (data) => {
        if (data?.error) {
          console.log("List Error", data.error);
          setError(data.error);
        } else {
          setError("");
          console.log("Data from sever", data);
          //Todo check if it is data.result
          setTasks(data);
        }
      }
    );
  }, []);

  //region onAdd Add task
  const onAdd = (text) => {
    if (text.trim()) {
      create(
        { boardId: board._id, userId: user._id },
        { t: token },
        { content: text, boardId: board._id, position: tasks.length }
      ).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          const { result } = data;
          const t = [...tasks];
          t.push(result);
          setTasks(t);
        }
      });
    }
  };
  //endregion

  return (
    <div className="columnContainer">
      <div className="columnTitle">
        <Link to={`/board/edit/${board._id}`}>{board.name} </Link>
      </div>
      <Droppable droppableId={board._id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Task tasks={tasks} onAdd={onAdd} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Board;
