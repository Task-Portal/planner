import { combineReducers } from "redux";
import { BoardReducer } from "./BoardReducer";
import { TaskReducer } from "./TaskReducer";

export const rootReducer = combineReducers({
  boards: BoardReducer,
  tasks: TaskReducer,
});
