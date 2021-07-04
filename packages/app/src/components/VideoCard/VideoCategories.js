import React from "react";
import { useVideo } from "../../video-context/VideoContext";

function VideoCategories() {
  const { dispatch } = useVideo();
  const setCategory = (e) => {    
    dispatch({ type: "CATEGORY", payload: e.target.value });
  };
  return (
    <div className="video-category">
      <button onClick={setCategory} value="Valorant">
        Valorant
      </button>
      <button onClick={setCategory} value="Football">
        Football
      </button>
      <button onClick={setCategory} value="CSGO">
        CSGO
      </button>
      <button onClick={setCategory} value="HALO">
        HALO
      </button>
      <button onClick={setCategory} value="All">
        All
      </button>
      <hr />
    </div>
  );
}

export default VideoCategories;
