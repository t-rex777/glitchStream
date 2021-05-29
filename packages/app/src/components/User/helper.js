import { GlitchApi } from "./../../utils";

export const getUserDetails = async () => {
  try {
    const response = await GlitchApi.get("/user");
    return response.data;
    // const res = await fetch(`${API}/user`, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer`,
    //   },
    // });
    // return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateLikedVideos = async (userDetails) => {
  try {
    const response = await GlitchApi.post("/user", {
      ...userDetails,
    });
    // const res = await fetch(`${API}/user`, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: userDetails,
    // });
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
    // const res = await fetch(`${API}/signin`, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });
    // return res.json();
  } catch (error) {
    console.log(error);
  }
};

// export const getLikedVideos = async () => {
//   try {
//     const response = await GlitchApi.get("/likedVideos");
//     return response.data;
//     // const res = await fetch(`${API}/likedvideos`);
//     // return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getHistory = async () => {
//   try {
//     const response = await GlitchApi.get("/history");
//     return response.data;
//     // const res = await fetch(`${API}/history`);
//     // return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const setLikeVideo = async (videoId) => {
  try {
    console.log(videoId)
    console.log(GlitchApi.defaults.headers)
    // response is not getting back
    const response = await GlitchApi.post(`/user/likedvideo/${videoId}`);
    console.log(response.data,"hehe")
    return response.data;

    // const res = await fetch(`${API}/user/likedvideo/${videoId}`, {
    //   method: "post",
    // });
    // return res.json();
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
    // const res = await fetch(`${API}/user/playlist`, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(playlist),
    // });
    // return res.json();
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
    // const res = await fetch(`${API}/user/removeplaylist/${playlistId}`, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(playlist),
    // });
    // return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const setHistory = async (videoId) => {
  try {
    const response = await GlitchApi.post(`/user/history/${videoId}`);
    return response.data;
    // console.log("history read");
    // const res = await fetch(`${API}/user/history/${videoId}`, {
    //   method: "post",
    // });
    // return res.json();
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
    // const res = await fetch(`${API}/user/suscription`, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(suscription),
    // });
    // return res.json();
  } catch (error) {
    console.log(error);
  }
};

// export const isSignedIn = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };
