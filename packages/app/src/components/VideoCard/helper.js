import axios from "axios";
import { API } from "./../../API";

export const getAllVideos = async () => {
  try {
    const response = await axios(`${API}/video`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoById = async (videoId) => {
  try {
    const response = await axios(`${API}/video/${videoId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
