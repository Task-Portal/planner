export const TASK_TYPE = "TASK_TYPE";

export const TaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_TYPE:
      console.log("task reducer", action.payload);
      return action.payload;
    default:
      return state;
  }
};
