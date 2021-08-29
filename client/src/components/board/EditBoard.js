import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { read, update, remove } from "./apiBoard";
import { isAuthenticated } from "../../auth";
import "./editBoard.css";

const EditBoard = () => {
  const { boardId } = useParams();
  const { user, token } = isAuthenticated();
  const [board, setBoard] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    read({ boardId: boardId, userId: user._id }, { t: token }).then((data) => {
      if (data?.error) {
        console.log("Edit Board read method if(data?.error)", data.error);
      } else {
        console.log("Data", data);
        setBoard(data);
      }
    });
  }, [boardId, user._id, token]);

  //region handleChange
  const handleChange = (name) => (event) => {
    setBoard({ ...board, [name]: event.target.value });
  };
  //endregion

  const onsubmit = () => {
    update({ boardId: boardId, userId: user._id }, { t: token }, board).then(
      (data) => {
        if (data?.error) {
          //Todo show error in form
          console.log("List Error", data.error);
        } else {
          setRedirect(true);
        }
      }
    );
  };

  const ondelete = () => {
    remove({ boardId: boardId, userId: user._id }, { t: token }, board).then(
      (data) => {
        if (data?.error) {
          //Todo show error in form
          console.log("List Error", data.error);
        } else {
          setRedirect(true);
        }
      }
    );
  };

  if (redirect) {
    return <Redirect to={"/user/boards"} />;
  }

  //region editForm
  const editForm = () => (
    <div className="editBoard">
      <h1 style={{ textAlign: "center" }}>Edit Board</h1>
      <span>Name</span>
      <div className="input-field col s6">
        <input
          id="name"
          onChange={handleChange("name")}
          type="text"
          value={board.name}
          required
          className="validate"
        />

        <span className="helper-text" data-error="Name required" />
      </div>

      <div className="row">
        <div className="input-field col s12">
          <span style={{ textAlign: "left" }}>Created</span>
          <input
            disabled
            value={new Date(board.created).toLocaleDateString()}
            id="disabled"
            type="text"
          />
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          type="submit"
          className="btn waves-effect waves-light editBoardButton"
          onClick={onsubmit}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
        <button
          type="submit"
          className="btn waves-effect waves-light editBoardButton"
          onClick={ondelete}
        >
          Delete
          <i className="material-icons right">delete</i>
        </button>
      </div>
    </div>
  );
  //endregion

  return editForm();
};

export default EditBoard;
