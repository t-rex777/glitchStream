import React from "react";
import Banner from "./components/Banner/Banner";
import VideoCard from "./components/VideoCard/VideoCard";
import Base from "./components/Base/Base";
import "./App.css";

function App() {
  return (
    <Base>
      <Banner />
      <VideoCard />
    </Base>
  );
}

export default App;
