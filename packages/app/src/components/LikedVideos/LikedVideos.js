import React from "react";
import { useVideo } from "../../video-context/VideoContext";
import Base from "./../Base/Base";
import { Link, Redirect } from "react-router-dom";
import "./likedVideos.css";
function LikedVideos() {
  const { state } = useVideo();

  return (
    <Base>
      {!state.user && <Redirect to="/signin" />}
      <div className="likedVideos">
        <h1>Liked Videos</h1>
        <div className="likedVideo-container">
          {state.likedVideos.map((vid, i) => {
            return (
              <div className="videoCard" key={i}>
                <Link to={`/video/${vid._id}`}>
                  <img
                    src={vid.thumbnail}
                    alt="vid"
                    className="videoThumbnail"
                  />
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
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default LikedVideos;
