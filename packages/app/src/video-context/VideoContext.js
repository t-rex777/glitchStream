import React, { createContext, useReducer, useContext, useEffect } from "react";
import { getAllVideos } from "./../components/VideoCard/helper";

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
      case "TOAST":
        return { ...state, toast: action.payload };
      case "TOAST_STYLE":
        return { ...state, toastStyle: action.payload };
        case "LOADING_STYLE":
        return { ...state, loadingStyle: action.payload };
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
    toast: "",
    toastStyle: {display:"none"},
    loadingStyle : {display : "none"}
  });

  useEffect(() => {
    (async () => {
      const videos = await getAllVideos();
      dispatch({ type: "VIDEOS", payload: videos });
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
