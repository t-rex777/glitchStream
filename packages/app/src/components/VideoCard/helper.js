import { API } from "./../../API";

export const getAllVideos = async () => {
  try {
    const res = await fetch(`${API}/video`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getVideoById = async (videoId) => {
  try {
    const res = await fetch(`${API}/video/${videoId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
