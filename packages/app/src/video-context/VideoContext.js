import React, { createContext, useReducer, useContext, useEffect } from "react";
import { setGlitchHeader } from "../utils";
import { getAllVideos } from "./../components/VideoCard/helper";
import Axios from "axios";
import { API } from "./../API";
import { GlitchApi } from "./../utils";
import { initialState, videoReducer } from "./VideoReducer";
const videoProvider = createContext();

export const VideoContext = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });
    (async () => {
      const videos = await getAllVideos();
      dispatch({ type: "SET_VIDEOS", payload: videos });
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
          localStorage.setItem("__rtoken", refreshToken);
          setGlitchHeader(accessToken);
          const userDetails = await GlitchApi.get("/user");
          const user = userDetails.data;
          // set all the dispatches
          dispatch({ type: "SIGNIN", payload: user });
          dispatch({ type: "SET_PLAYLIST", payload: user.playlists });
          dispatch({ type: "SET_HISTORY", payload: user.history });
          dispatch({ type: "SET_LIKED_VIDEOS", payload: user.likedVideos });
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
