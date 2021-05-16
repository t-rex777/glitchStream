import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useVideo } from "../../video-context/VideoContext";
import "./loading.css";

function Loading() {
  const { state } = useVideo();
  return (
    <div className="loading" style={state.loadingStyle}>
      <div className="loading-icon">
        {/* <Loader
          type="Puff"
          color="#f21170"
          secondaryColor="3edbf0"
          height={100}
          width={100}
          // timeout={3000} //3 secs
        /> */}
        <Loader
          type="Bars"
          color="#f21170"
          secondaryColor="#3edbf0"
          height={80}
          width={80}
        />
      </div>
    </div>
  );
}

export default Loading;
