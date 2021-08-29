export const BOARD_TYPE = "BOARD_TYPE";

export const BoardReducer = (state = {}, action) => {
  switch (action.type) {
    case BOARD_TYPE:
      console.log("board reducer", action.payload);
      return action.payload;
    default:
      return state;
  }
};
