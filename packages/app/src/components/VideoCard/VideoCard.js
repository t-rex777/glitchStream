import React from "react";
import { Link } from "react-router-dom";
import "./videoCard.css";
import { useVideo } from "../../video-context/VideoContext";
function VideoCard() {
  const { state } = useVideo();
  const { videos } = state;

  return (
    <div className="videoRow">
      {videos.map((vid) => {
        return (
          <div className="videoCard" key={vid.videoId}>
            <Link to={`/video/${vid._id}`}>
              <img src={vid.thumbnail} alt="vid" className="videoThumbnail" />
            </Link>

            <span className="video-uploader">
              <img
                src={vid.avatar}
                alt=""
                style={{ height: "30px", width: "30px", borderRadius: "50%", position:"relative",
              top:"10px" }}
              />
              <span>
                <h3>{vid.name}</h3>
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
