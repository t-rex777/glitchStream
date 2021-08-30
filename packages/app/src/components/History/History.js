import React from "react";
import { useVideo } from "../../video-context/VideoContext";
import Base from "./../Base/Base";
import { Link } from "react-router-dom";
import "./history.css";
function History() {
  const { state } = useVideo();

  return (
    <Base>
      <div className="history">
        <h1>History</h1>
        <div className="history-container">
          {state.history.map((vid, i) => {
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
                    <h3 className="text-md">{vid.name}</h3>
                    <p className="text-gray text-xs m-1">{vid.uploadedBy}</p>
                  </span>
                </span>
                {/* <button className="btn btn-danger text-xs" style={{padding:"2px 5px"}} >remove</button> */}
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default History;
