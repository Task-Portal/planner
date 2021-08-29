import React from "react";

import { AddNewItem } from "../AddNewItem";
import { Link } from "react-router-dom";

const Task = ({ tasks, onAdd }) => {
  //region return

  return (
    <>
      {tasks?.map((task, i) => {
        return (
          <div
            className="cardContainer"
            style={{
              backgroundColor: task.backgroundColor,
            }}
          >
            <Link
              to={"/task/edit/" + task._id}
              style={{ color: task.fontColor }}
            >
              {task.content}
            </Link>
          </div>
        );
      })}

      <AddNewItem toggleButtonText="+ Add another task" onAdd={onAdd} dark />
    </>
  );
  //endregion
};

export default Task;
