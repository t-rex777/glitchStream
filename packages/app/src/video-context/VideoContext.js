import React, { createContext, useReducer, useContext, useEffect } from "react";
import { setGlitchHeader } from "../utils";
import { getAllVideos } from "./../components/VideoCard/helper";
import Axios from "axios";
import { API } from "./../API";
import { GlitchApi } from "./../utils";
const videoProvider = createContext();

export const VideoContext = ({ children }) => {
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "SIGNIN":
        return { ...state, user: action.payload };
      case "SIGNOUT":
        return { ...state, user: "" };
      case "VIDEOS":
        return { ...state, videos: action.payload };
      case "VIDEO":
        return { ...state, video: action.payload };
      case "PLAYLIST":
        return { ...state, playlist: action.payload };
      case "HISTORY":
        return { ...state, history: action.payload };
      case "LIKED_VIDEOS":
        return { ...state, likedVideos: action.payload };
      case "TOAST":
        return { ...state, toast: action.payload };
      case "HAM":
        return { ...state, ham: !state.ham };
      case "TOAST_STYLE":
        return { ...state, toastStyle: action.payload };
      case "LOADING_STYLE":
        return { ...state, loadingStyle: action.payload };
      case "SET_ACCESS_TOKEN":
        return { ...state, accessToken: action.payload };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, {
    user: "",
    videos: [],
    video: {},
    playlist: [],
    history: [],
    likedVideos: [],
    toast: "",
    ham: true,
    toastStyle: { display: "none" },
    loadingStyle: { display: "none" },
  });

  useEffect(() => {
    dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });
    (async () => {
      const videos = await getAllVideos();
      dispatch({ type: "VIDEOS", payload: videos });
      dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
    })();
  }, []);
  useEffect(() => {
    dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });
    (async () => {
      const rToken = localStorage.getItem("__rtoken");
      if (rToken && typeof rToken === "string") {
        try {
          const newAccessTokenRequest = await Axios({
            baseURL: API,
            method: "GET",
            url: "/token/access",
            headers: {
              "refresh-token": `Bearer ${rToken}`,
            },
          });

          const { accessToken, refreshToken } = newAccessTokenRequest.data;
          console.log(newAccessTokenRequest);
          localStorage.setItem("__rtoken", refreshToken);
          setGlitchHeader(accessToken);

          const userDetails = await GlitchApi.get("/user");
          console.log(userDetails);
          const user = userDetails.data;
          // set all the dispatches
          dispatch({ type: "SIGNIN", payload: user });
          dispatch({ type: "PLAYLIST", payload: user.playlists });
          dispatch({ type: "HISTORY", payload: user.history });
          dispatch({ type: "LIKED_VIDEOS", payload: user.likedVideos });
          dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
          dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
        } catch (error) {
          localStorage.removeItem("__rtoken");
          console.log(error);
          // dispatch to logout user
          dispatch({ type: "SIGNOUT" });
        }

        setInterval(async () => {
          const newAccessTokenRequest = await Axios({
            baseURL: API,
            method: "GET",
            url: "/token/access",
            headers: {
              "refresh-token": `Bearer ${rToken}`,
            },
          });
          const { accessToken, refreshToken } = newAccessTokenRequest.data;
          localStorage.setItem("__rtoken", refreshToken);
          setGlitchHeader(accessToken);
        }, 840000);
      }
    })();
  }, []);
  return (
    <videoProvider.Provider value={{ state, dispatch }}>
      {children}
    </videoProvider.Provider>
  );
};

export const useVideo = () => {
  return useContext(videoProvider);
};
