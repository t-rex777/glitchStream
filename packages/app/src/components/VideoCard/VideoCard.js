import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../video-context/VideoContext";
import "./videoCard.css";

const setCategory = (videos, category) => {
  if (category === "All") {
    return videos;
  } else {
    return videos.filter((video) => video.category === category);
  }
};

function VideoCard() {
  const { state } = useVideo();
  const { category, videos } = state;
  const [filteredVideos, setFilteredVideos] = useState();

  useEffect(() => {
    setFilteredVideos(videos)
    if (category !== "") {
      setFilteredVideos(setCategory(videos, category));
    }
  }, [category, videos]);

  return (
    <div className="videoRow">
      {filteredVideos &&
        filteredVideos.map((vid) => {
          return (
            <div className="videoCard" key={vid.videoId}>
              <Link to={`/video/${vid._id}`}>
                <img src={vid.thumbnail} alt="vid" className="videoThumbnail" />
              </Link>

              <span className="video-uploader">
                <img
                  src={vid.avatar}
                  alt=""
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    position: "relative",
                    top: "10px",
                  }}
                />
                <span>
                  <h3 className="video-title">{vid.name}</h3>
                  <p className="text-gray text-xs m-1">{vid.uploadedBy}</p>
                </span>
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default VideoCard;
