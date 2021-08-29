import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { read, updateTask, remove } from "./apiTask";
import { isAuthenticated } from "../../auth";
import "./editTask.css";
import ShowImage from "./ShowImage";
import SelectComponent from "./Select";
import DatePicker from "./DatePicker";

const EditTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    content: "",
    description: "",
    image: "",
    availableImages: false,
    created: "",
    fontColor: "",
    backgroundColor: "",
    updated: "",
    status: "",
    startDay: "",
    finishDay: "",
    boardId: "",
    formData: "",
  });
  const { user, token } = isAuthenticated();
  const [redirect, setRedirect] = useState(false);

  //region useEffect brings task
  useEffect(() => {
    read({ taskId, userId: user._id }, { t: token }).then((data) => {
      if (data?.error) {
        console.log("List Error", data.error);
      } else {
        setTask({ ...data, formData: new FormData() });
        console.log("Data from read useEffect", data);
      }
    });
  }, [taskId, user._id, token]);
  //endregion

  //region handleChange handleChangeChild
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setTask({ ...task, [name]: value });
  };

  const handleChangeChild = (e, name) => {
    if (name === "Start Day") name = "startDay";
    if (name === "Finish Day") name = "finishDay";
    setTask({ ...task, [name]: e });
  };
  //endregion
  //region onsubmit
  const onsubmit = () => {
    task.image && task.formData.append("image", task.image);
    task.description && task.formData.append("description", task.description);
    task.formData.append("content", task.content);
    task.formData.append("boardId", task.boardId);
    task.backgroundColor &&
      task.formData.append("backgroundColor", task.backgroundColor);
    task.fontColor && task.formData.append("fontColor", task.fontColor);
    task.formData.set("status", task.status);
    task.formData.set("startDay", task.startDay);
    task.formData.set("finishDay", task.finishDay);
    updateTask({ taskId, userId: user._id }, { t: token }, task.formData).then(
      (data) => {
        if (data?.error) {
          //Todo show error in form
          console.log("updateTask EditTask data.error", data.error);
        } else {
          setRedirect(true);
        }
      }
    );
  };
  //endregion
  const ondelete = () => {
    remove({ taskId, userId: user._id }, { t: token }).then((data) => {
      if (data?.error) {
        //Todo show error in form
        console.log("removed EditTask data.error", data.error);
      } else {
        setRedirect(true);
      }
    });
  };
  //region redirect
  if (redirect) {
    return <Redirect to={"/user/boards"} />;
  }
  //endregion

  //region editForm
  const editForm = () => (
    <div className="editTask">
      <h1 style={{ textAlign: "center" }}>Edit Task</h1>
      {/*region Content*/}
      <span>Content</span>
      <div className="input-field col s6">
        <input
          id="name"
          onChange={handleChange("content")}
          type="text"
          value={task.content}
          name="content"
          required
          className="validate"
        />

        <span className="helper-text" data-error="Content required" />
      </div>
      {/*endregion*/}
      {/*region Image*/}
      <div>{task.availableImages ? "Images" : "No images"}</div>
      {task.availableImages && <ShowImage task={task} />}
      <input
        onChange={handleChange("image")}
        type="file"
        name="image"
        accept="image/*"
      />
      {/*endregion */}
      <hr />
      {/*region Description*/}
      <span>{task.description ? "Description" : "No description"}</span>
      <div className="input-field col s6">
        <input
          id="description"
          onChange={handleChange("description")}
          type="text"
          value={task.description}
          name="description"
        />
      </div>
      {/*endregion*/}
      {/*  region Colors*/}
      <span>Background Color</span>
      <div className="input-field col s6">
        <pre>{task.backgroundColor}</pre>
        <input
          type="color"
          value={task.backgroundColor}
          onChange={handleChange("backgroundColor")}
        />
      </div>
      <hr />
      <span>Font Color</span>
      <div className="input-field col s6">
        <pre>{task.fontColor}</pre>
        <input
          type="color"
          value={task.fontColor}
          onChange={handleChange("fontColor")}
        />
      </div>
      <hr />
      {/*  endregion*/}
      {/*region Created*/}
      <div className="input-field col s6">
        <span>Created</span>
        <pre>
          {new Date(task.created).toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </pre>
      </div>
      <hr />
      {/*endregion*/}
      {/*region Updated*/}
      <div className="input-field col s6">
        <span>Updated</span>
        <pre>
          {new Date(task.updated).toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </pre>
      </div>
      <hr />
      {/*endregion*/}
      {/*region Status*/}

      {task.status && (
        <SelectComponent
          selectedElem={task.status}
          handleChange={handleChangeChild}
        />
      )}

      {/*endregion*/}

      {/*  region Start Day*/}
      {task.startDay && (
        <DatePicker
          name="Start Day"
          selectedDate={task.startDay}
          handleChange={handleChangeChild}
        />
      )}
      {/*  endregion Start Day*/}
      {/*  region Finish Day*/}
      {task.finishDay && (
        <DatePicker
          name="Finish Day"
          selectedDate={task.finishDay}
          handleChange={handleChangeChild}
        />
      )}
      {/*  endregion Finish Day*/}

      {/*region Buttons*/}
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn waves-effect waves-light editTaskButton"
          onClick={onsubmit}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
        <button
          type="button"
          className="btn waves-effect waves-light editBoardButton"
          onClick={ondelete}
        >
          Delete
          <i className="material-icons right">delete</i>
        </button>
      </div>
      {/*//endregion */}
    </div>
  );
  //endregion

  return editForm();
};

export default EditTask;
