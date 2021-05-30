import { GlitchApi } from "./../../utils";

export const getUserDetails = async () => {
  try {
    const response = await GlitchApi.get("/user");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLikedVideos = async (userDetails) => {
  try {
    const response = await GlitchApi.post("/user", {
      ...userDetails,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async (user) => {
  try {
    const response = await GlitchApi.post("/signin", {
      ...user,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setLikeVideo = async (videoId) => {
  try {
    console.log(videoId);
    console.log(GlitchApi.defaults.headers);
    const response = await GlitchApi.post(`/user/likedvideo/${videoId}`);
    console.log(response.data, "hehe");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setPlaylist = async (playlist) => {
  try {
    const response = await GlitchApi.post(`/user/playlist`, {
      ...playlist,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeUserPlaylist = async (playlistId, playlist) => {
  try {
    const response = await GlitchApi.post(
      `/user/removeplaylist/${playlistId}`,
      {
        ...playlist,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setHistory = async (videoId) => {
  try {
    const response = await GlitchApi.post(`/user/history/${videoId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setSuscription = async (suscription) => {
  try {
    const response = await GlitchApi.post(`/user/suscription`, {
      ...suscription,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
