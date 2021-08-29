import React, { useState, useEffect } from "react";
import { create, list } from "./apiBoard";
import { isAuthenticated } from "../../auth";
import Board from "./Board";
import { AddNewItem } from "../AddNewItem";
import "../../styles.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { listTasks, updateManyTasks } from "../task/apiTask";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { BOARD_TYPE } from "../../store/BoardReducer";

const UserBoards = () => {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const boardsFromStore = useSelector((state) => state.boards);

  console.log("boardsFromStore", boardsFromStore);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    list({ userId: user._id }, { t: token }).then((data) => {
      if (data?.error) {
        setError(data.error);
      } else {
        setError("");
        dispatch({ type: BOARD_TYPE, payload: { data } });
        setBoards(data);
        setSuccess("");
      }
    });
  }, []);

  // data: Array(3)
  // 0: {_id: "611b4e7910480a0aa8b6dbb3", name: "To do", owner: "6115257b4f8ebb2f14ca7afe", created: "2021-08-17T05:51:53.772Z", __v: 0}
  // 1: {_id: "611b4e8210480a0aa8b6dbb6", name: "In Process", owner: "6115257b4f8ebb2f14ca7afe", created: "2021-08-17T05:52:02.797Z", __v: 0}
  // 2: {_id: "611b4e8610480a0aa8b6dbb9", name: "Done", owner: "6115257b4f8ebb2f14ca7afe", created: "2021-08-17T05:52:06.731Z", __v: 0}
  //

  useEffect(() => {
    let boardsWithTasks = { ...boardsFromStore };
    if (_.isEmpty(boardsWithTasks)) return;

    boardsWithTasks.data.map((item) => {
      const t = listTasks(
        { boardId: item._id, userId: user._id },
        { t: token }
      ).then((data) => {
        if (data?.error) {
          console.log("List Error", data.error);
          setError(data.error);
        } else {
          setError("");
          console.log("Data from sever", data);
          return data;
        }
      });
      Promise.all(t).then((result) => {
        item.tasks = result;
        return item;
      });
    });

    console.log("boardsWithTasks", boardsWithTasks);
  }, [boardsFromStore]);

  const getTasks = async (boardId) => {
    return await listTasks({ boardId, userId: user._id }, { t: token }).then(
      (data) => {
        if (data?.error) {
          console.log("List Error", data.error);
          setError(data.error);
        } else {
          return data;
        }
      }
    );
  };
  //not done
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log("result", result);

    //region Checks
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //endregion

    // destination: {droppableId: "611b4e8210480a0aa8b6dbb6", index: 0} board
    // draggableId: "6126429132e4e94a18cbd904" task
    //
    // source: {index: 1, droppableId: "611b4e8210480a0aa8b6dbb6"}
    let fetchedTasks = {};

    // getTasks(source.droppableId)
    //   .then((data) => {
    //     return (fetchedTasks = data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    console.log(fetchedTasks);

    if (source.droppableId === destination.droppableId) {
      // const item = fetchedTasks.splice(source.index, 1);
      // fetchedTasks.splice(destination.index, 0, item[0]);
      //
      // fetchedTasks.map((item, index) => {
      //   return item.position !== index
      //     ? (item.position = index)
      //     : item.position;
      // });
      //
      // updateManyTasks({ userId: user._id }, { t: token }, fetchedTasks).then(
      //   (data) => {
      //     if (data.error) {
      //       console.log(data.error);
      //     } else {
      //       console.log("Data", data);
      //     }
      //   }
      // );
      // setTasks(fetchedTasks);
    }
  };

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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="appContainer">
          {boards &&
            boards.map((board, i) => {
              //Todo send tasks
              return <Board board={board} key={i} />;
            })}

          <AddNewItem toggleButtonText="+Add another listTasks" onAdd={onAdd} />
          {error && <div>{error}</div>}
          {success && <div>{success}</div>}
        </div>
      </DragDropContext>
    </>
  );
};

export default UserBoards;
