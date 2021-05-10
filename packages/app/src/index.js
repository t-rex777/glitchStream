import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { VideoContext } from "./video-context/VideoContext";

ReactDOM.render(
  <React.StrictMode>
    <VideoContext>
      <Routes />
    </VideoContext>
  </React.StrictMode>,
  document.getElementById("root")
);
