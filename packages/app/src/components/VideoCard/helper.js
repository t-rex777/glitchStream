import { API } from "./../../API";

export const getAllVideos = () => {
  return fetch(`${API}/video`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getVideoById = (videoId) => {
  return fetch(`${API}/video/${videoId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

