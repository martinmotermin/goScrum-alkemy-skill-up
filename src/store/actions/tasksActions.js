import { TASK_REQUEST, TASK_SUCCESS, TASK_FAILURE } from "../types";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const tasksRequest = () => ({
  type: TASK_REQUEST,
});

export const taskSuccess = (data) => ({
  type: TASK_SUCCESS,
  payload: data,
});

export const taskFailure = (error) => ({
  type: TASK_FAILURE,
  payload: error,
});

export const getTasks = (path) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${API_ENDPOINT}task/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("loggedIn"),
    },
  })
    .then((resp) => resp.json())
    .then((data) => dispatch(taskSuccess(data.result)))
    .catch((error) => dispatch(taskFailure(error)));
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${API_ENDPOINT}task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("loggedIn"),
    },
  })
    .then((resp) => resp.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(taskFailure(error)));
};

export const editTaskStatus = (data) => (dispatch) => {
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];

  const newStatusIndex =
    statusArray.indexOf(data.status) > 1
      ? 0
      : statusArray.indexOf(data.status) + 1;

  dispatch(tasksRequest());
  fetch(`${API_ENDPOINT}task/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("loggedIn"),
    },
    body: JSON.stringify({
      task: {
        title: data.title,
        importance: data.importance,
        status: statusArray[newStatusIndex],
        description: data.description,
      },
    }),
  })
    .then((resp) => resp.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(taskFailure(error)));
};

export const postNewTask = (data) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${API_ENDPOINT}task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("loggedIn")}`,
    },
    body: JSON.stringify({
      task: { ...data },
    }),
  })
    .then((res) => res.json())
    .then(() => {
      dispatch(getTasks(""));
    })
    .catch((error) => dispatch(taskFailure(error)));
};
