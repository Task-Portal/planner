import React from "react";
import { API } from "../../config";
import "./editTask.css";

const ShowImage = ({ task }) => {
  // useScript(script);

  return (
    <div className="product-img">
      {task._id && (
        <img
          src={`${API}/task/image/${task._id}?` + new Date().getTime()}
          alt={task.content}
          className="materialboxed"
          width="150"
        />
      )}
    </div>
  );
};

export default ShowImage;
