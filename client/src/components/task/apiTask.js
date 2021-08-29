import { API } from "../../config";

export const read = (params, credentials) => {
  return fetch(`${API}/task/one/${params.taskId}/${params.userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listTasks = ({ boardId, userId }, credentials) => {
  return fetch(`${API}/task/listTasks/${boardId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const create = ({ boardId, userId }, credentials, task) => {
  return fetch(`${API}/task/create/${boardId}/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t,
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      console.log("response123", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateTask = ({ taskId, userId }, credentials, task) => {
  return fetch(`${API}/task/${taskId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",

      Authorization: "Bearer " + credentials.t,
    },
    body: task,
  })
    .then((response) => {
      console.log("updateTask apiTask then", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const remove = ({ taskId, userId }, credentials) => {
  return fetch(`${API}/task/${taskId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t,
    },
  })
    .then((response) => {
      console.log("remove apiTask then", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

// /task/updateMany/:userId
export const updateManyTasks = ({ userId }, credentials, tasks) => {
  return fetch(`${API}/task/updateMany/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t,
    },
    body: JSON.stringify(tasks),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
