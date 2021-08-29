import { API } from "../../config";

//Todo check
export const list = (params, credentials) => {
  return fetch(`${API}/board/` + params.userId, {
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

export const create = (params, credentials, board) => {
  return fetch(`${API}/board/create/` + params.userId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t,
    },
    body: JSON.stringify(board),
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (params, credentials) => {
  return fetch(`${API}/board/${params.boardId}/${params.userId}`, {
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

export const update = (params, credentials, board) => {
  return fetch(`${API}/board/${params.boardId}/${params.userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t,
    },
    body: JSON.stringify(board),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const remove = (params, credentials, board) => {
  return fetch(`${API}/board/${params.boardId}/${params.userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t,
    },
    body: JSON.stringify(board),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
