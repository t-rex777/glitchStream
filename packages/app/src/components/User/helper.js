import { API } from "./../../API";

export const getUserDetails = async (userId) => {
  try {
    const res = await fetch(`${API}/user/${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateLikedVideos = async (userId, userDetails) => {
  try {
    const res = await fetch(`${API}/user/${userId}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userDetails,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async (user) => {
  try {
    const res = await fetch(`${API}/signin`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return res.json()
  } catch (error) {
    console.log(error);
  }
};

export const getLikedVideos = async () => {
  try {
    const res = await fetch(`${API}/likedvideos`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getHistory = async () => {
  try {
    const res = await fetch(`${API}/history`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const setLikeVideo = async (userId, videoId) => {
  try {
    const res = await fetch(`${API}/user/${userId}/likedvideo/${videoId}`, {
      method: "post",
    });
    return res.json();
  } catch (error) {
    console.lof(error);
  }
};

export const setPlaylist = async (userId, playlist) => {
  try {
    const res = await fetch(`${API}/user/${userId}/playlist`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeUserPlaylist = async (userId, playlistId, playlist) => {
  try {
    const res = await fetch(
      `${API}/user/${userId}/removeplaylist/${playlistId}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playlist),
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const setHistory = async (userId, videoId) => {
  try {
    console.log("history read");
    const res = await fetch(`${API}/user/${userId}/history/${videoId}`, {
      method: "post",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const setSuscription = async (userId, suscription) => {
  try {
    const res = await fetch(`${API}/user/${userId}/suscription`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suscription),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// export const isSignedIn = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };
