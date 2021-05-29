import "./App.css";
import Banner from "./components/Banner/Banner";
import VideoCard from "./components/VideoCard/VideoCard";
import Base from "./components/Base/Base";
import { setGlitchHeader, GlitchApi } from "./utils";
import { API } from "./API";
import Axios from "axios";
import { useVideo } from "./video-context/VideoContext";
import { useEffect } from "react";

function App() {
  //TODO
  /**
   * Create an endpoint for getting tokens
   * 1 /token/refresh ,  type get, header refresh-token in Bearer-token format
   * 2 /user , type get , header Authorization in Bearer-token
   */
  const { state, dispatch } = useVideo();
  useEffect(() => {
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
          dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
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
    <Base>
      <Banner />
      <VideoCard />
    </Base>
  );
}

export default App;
