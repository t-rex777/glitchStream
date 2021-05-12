import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { useVideo } from "../../video-context/VideoContext";
import { getVideoById } from "./helper";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { RiShareForwardFill } from "react-icons/ri";
import {
  getUserDetails,
  setHistory,
  setLikeVideo,
  setSuscription,
  updateLikedVideos,
} from "./../User/helper";
import Base from "./../Base/Base";
import PlaylistModal from "./PlaylistModal";
import Toast from "../Toast/Toast";

function VideoPage() {
  const videoSrc = "https://www.youtube.com/embed/";
  const { state, dispatch } = useVideo();
  const { user, video } = state;
  const { videoId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [iconColor, setIconColor] = useState({
    color: "#fff",
  });
  useEffect(() => {
    (async () => {
      const video = await getVideoById(videoId);
      dispatch({ type: "VIDEO", payload: video });
    })();

    if (user) {
      if (user.likedVideos.find((element) => element._id === `${videoId}`)) {
        setIconColor({ color: "red" });
        return;
      }
    }

    (async () => {
      if (user) {
        await setHistory(user._id, videoId)
          .then(async (data) => {
            const userDetails = await getUserDetails(user._id);
            dispatch({ type: "SIGNIN", payload: userDetails });
            dispatch({ type: "HISTORY", payload: userDetails.history });
          })
          .catch((err) => console.log(err));
      } else {
        setRedirect(true);
      }
    })();
  }, []);

  const likeVideo = async () => {
    if (user) {
      if (user.likedVideos.find((element) => element._id === `${videoId}`)) {
        console.log("already liked!");
        return;
      }
      await setLikeVideo(user._id, videoId)
        .then(async (data) => {
          const userDetails = await getUserDetails(user._id);
          dispatch({ type: "SIGNIN", payload: userDetails });

          setIconColor({color:"red"})
        })
        .catch((err) => console.log(err));
    } else {
      setRedirect(true);
    }
  };

  const dislikeVideo = async () => {
    const finalVideoIds = [];
    user.likedVideos.forEach((video) => {
      if (video._id !== videoId) {
        finalVideoIds.push(video._id);
      }
    });
    updateLikedVideos(user._id, JSON.stringify({ likedVideos: finalVideoIds }))
      .then(async (data) => {
        setIconColor({color:"#fff"})
        const userDetails = await getUserDetails(user._id);
        dispatch({ type: "SIGNIN", payload: userDetails });
      })
      .catch((err) => console.log(err));
  };

  const suscribeVideo = async () => {
    if (user) {
      if (
        user.suscriptions.find((element) => element === `${video.uploadedBy}`)
      ) {
        console.log("already suscribed!");
        return;
      }
      var obj = {
        suscriptions: video.uploadedBy,
      };
      await setSuscription(user._id, obj)
        .then(async (data) => {
          const userDetails = await getUserDetails(user._id);
          dispatch({ type: "SIGNIN", payload: userDetails });
        })
        .catch((err) => console.log(err));
    } else {
      setRedirect(true);
    }
  };
  return (
    <Base>
      {redirect && <Redirect to="/signin" />}
      <div className="video-container">
        {video ? (
          <>
            <div style={{ paddingBottom: "56.25%", position: "relative" }}>
              <iframe
                className="embed-video"
                src={videoSrc + video.videoId}
                title="valorant"
                allowFullScreen
              />
            </div>

            <div className="video-interactions mt-1">
              <span
                className="interaction-item"
                style={iconColor}
                onClick={likeVideo}
              >
                <AiFillLike />
              </span>
              <span className="interaction-item" onClick={dislikeVideo}>
                <AiFillDislike />
              </span>
              <span className="interaction-item ">
                <RiShareForwardFill />
                <p>Share</p>
              </span>
              {/* MODAL HERE */}
              <PlaylistModal videoId={videoId} />
              {/* MODAL END */}
            </div>

            <h1 className="mt-2 mb-3 text-md">{video.name}</h1>
            <hr />
            <div className="uploader-info">
              <span className="video-uploader mt-2">
                <img src={video.avatar} alt="" />
                <span>
                  <h3>{video.uploadedBy}</h3>
                  <p className="video-desc mt-4">{video.description}</p>
                </span>
              </span>
              <button className="suscribe-btn" onClick={suscribeVideo}>
                SUSCRIBE
              </button>
            </div>
          </>
        ) : (
          <h1>no videos found</h1>
        )}
      </div>
    </Base>
  );
}

export default VideoPage;
