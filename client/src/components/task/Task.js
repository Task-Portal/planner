import React from "react";

import { AddNewItem } from "../AddNewItem";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { isAuthenticated } from "../../auth";
import { updateManyTasks } from "./apiTask";

const Task = ({ tasks, onAdd }) => {
  const { user, token } = isAuthenticated();

  // if (tasks && source != undefined) {
  //   if (tasks.findIndex((x) => x._id === draggableId) !== -1) {
  //     const newTask = [...tasks];
  //
  //     if (source.droppableId === destination.droppableId) {
  //       const item = newTask.splice(source.index, 1);
  //       newTask.splice(destination.index, 0, item[0]);
  //
  //       newTask.map((item, index) => {
  //         return item.position !== index
  //           ? (item.position = index)
  //           : item.position;
  //       });
  //
  //       updateManyTasks({ userId: user._id }, { t: token }, newTask).then(
  //         (data) => {
  //           if (data.error) {
  //             console.log(data.error);
  //           } else {
  //             console.log("Data", data);
  //             // setTasks(newTask);
  //           }
  //         }
  //       );
  //     }
  //   }
  // }

  //region return

  return (
    <>
      {tasks?.map((task, i) => {
        return (
          <Draggable draggableId={task._id} index={i} key={task._id}>
            {(provided) => (
              <div
                className="cardContainer"
                style={{
                  backgroundColor: task.backgroundColor,
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <Link
                  to={"/task/edit/" + task._id}
                  style={{ color: task.fontColor }}
                >
                  {task.content}
                </Link>
              </div>
            )}
          </Draggable>
        );
      })}

      <AddNewItem toggleButtonText="+ Add another task" onAdd={onAdd} dark />
    </>
  );
  //endregion
};

export default Task;
