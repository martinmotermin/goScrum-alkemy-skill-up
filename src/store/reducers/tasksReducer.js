import { TASK_REQUEST, TASK_SUCCESS, TASK_FAILURE } from "../types";
const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case TASK_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
      break;
    case TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
      break;
  }
};
