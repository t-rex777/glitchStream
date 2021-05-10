import { API } from "./../../API";

export const getUserDetails = (userId) => {
  return fetch(`${API}/user/${userId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateLikedVideos = (userId, userDetails) => {
  return fetch(`${API}/user/${userId}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: userDetails,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const signInUser = (user) => {
  return fetch(`${API}/signin`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getLikedVideos = () => {
  return fetch(`${API}/likedvideos`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getHistory = () => {
  return fetch(`${API}/history`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const setLikeVideo = (userId, videoId) => {
  return fetch(`${API}/user/${userId}/likedvideo/${videoId}`, {
    method: "post",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const setPlaylist = (userId, playlist) => {
  return fetch(`${API}/user/${userId}/playlist`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};


export const removeUserPlaylist = (userId,playlistId,playlist) => {
  return fetch(`${API}/user/${userId}/removeplaylist/${playlistId}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const setHistory = (userId, videoId) => {
  return fetch(`${API}/user/${userId}/history/${videoId}`, {
    method: "post",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const setSuscription = (userId, suscription) => {
  return fetch(`${API}/user/${userId}/suscription`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(suscription),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// export const isSignedIn = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };
