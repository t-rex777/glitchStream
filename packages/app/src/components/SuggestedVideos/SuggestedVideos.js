import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../video-context/VideoContext";
import "./suggestedVideos.css";
function SuggestedVideos({ category, currentVideo }) {
  const { state } = useVideo();
  return (
    <div className="suggestedVideos">
      <h2>Suggested Videos</h2>
      <div className="suggestedVideos-container">

        {state.videos
          .filter(
            (video) => video.category === category && video._id !== currentVideo
          )
          .map((vid) => (
              <div className="videoCard" key={vid._id}>
                
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
                  <h3>{vid.name}</h3>
                  <p className="text-gray text-xs m-1">{vid.uploadedBy}</p>
                </span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SuggestedVideos;
