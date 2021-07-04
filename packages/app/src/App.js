import React from "react";
import Banner from "./components/Banner/Banner";
import VideoCard from "./components/VideoCard/VideoCard";
import Base from "./components/Base/Base";
import "./App.css";
import VideoCategories from './components/VideoCard/VideoCategories';

function App() {
  return (
    <Base>
      <Banner />
      <VideoCategories/>
      <VideoCard />
    </Base>
  );
}

export default App;
