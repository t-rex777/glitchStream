import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { useVideo } from "../../video-context/VideoContext";
import { getVideoById } from "./helper";
import { AiFillLike } from "react-icons/ai";

import {
  getUserDetails,
  setHistory,
  setLikeVideo,
  setSuscription,
  updateLikedVideos,
} from "./../User/helper";
import Base from "./../Base/Base";
import PlaylistModal from "./PlaylistModal";
import ShareModal from "./ShareModal";

function VideoPage() {
  const videoSrc = "https://www.youtube.com/embed/";
  const { state, dispatch } = useVideo();
  const { user, video } = state;
  const { videoId } = useParams();
  const [isSuscbribed, setIsSuscbribed] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [iconColor, setIconColor] = useState({
    like: { color: "#fff" },
    dislike: { color: "#fff" },
  });
  useEffect(() => {
    (async () => {
      const video = await getVideoById(videoId);
      dispatch({ type: "VIDEO", payload: video });
    })();

    if (user) {
      if (user.likedVideos.find((element) => element._id === `${videoId}`)) {
        setIconColor({ ...iconColor, like: { color: "red" } });
        return;
      }
    }
    // adding history
    (async () => {
      if (user) {
        console.log("user is there");
        const data = await setHistory(user._id, videoId);
        try {
          console.log("history");
          const userDetails = await getUserDetails(user._id);
          await dispatch({ type: "SIGNIN", payload: userDetails });
          await dispatch({ type: "HISTORY", payload: userDetails.history });
        } catch (error) {
          console.log(error);
        }
      } else {
        setRedirect(true);
      }
    })();

    (async () => {
      user &&
        (await user.suscriptions.forEach((sus) => {
          if (sus === video.uploadedBy) {
            setIsSuscbribed(true);
          }
        }));
    })();
  }, []);

  const likeVideo = async () => {
    if (user) {
      dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });
      if (user.likedVideos.find((element) => element._id === `${videoId}`)) {
        console.log("already liked!");
        (async () => {
          const finalVideoIds = [];
          user.likedVideos.forEach((video) => {
            if (video._id !== videoId) {
              finalVideoIds.push(video._id);
            }
          });
          const data = await updateLikedVideos(
            user._id,
            JSON.stringify({ likedVideos: finalVideoIds })
          );
          try {
            if (data !== undefined) {
              dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
              setIconColor({ ...iconColor, like: { color: "#fff" } });
              const userDetails = await getUserDetails(user._id);
              dispatch({ type: "SIGNIN", payload: userDetails });
            }
          } catch (error) {
            console.log(error);
          }
        })();
        return;
      }
      const data2 = await setLikeVideo(user._id, videoId);
      try {
        if (data2 !== undefined) {
          dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
          setIconColor({ ...iconColor, like: { color: "red" } });
          const userDetails = await getUserDetails(user._id);
          dispatch({ type: "SIGNIN", payload: userDetails });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setRedirect(true);
    }
  };

  const suscribeVideo = async () => {
    if (user) {
      dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });

      if (
        user.suscriptions.find((element) => element === `${video.uploadedBy}`)
      ) {
        console.log("already suscribed!");
        return;
      }
      var obj = {
        suscriptions: video.uploadedBy,
      };
      const data = await setSuscription(user._id, obj);
      try {
        if (data !== undefined) {
          dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
          setIsSuscbribed(true)
          const userDetails = await getUserDetails(user._id);
          dispatch({ type: "SIGNIN", payload: userDetails });
        }
      } catch (error) {
        console.log(error);
      }
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
                style={iconColor.like}
                onClick={likeVideo}
              >
                <AiFillLike />
              </span>
              {/* <span
                className="interaction-item"
                style={iconColor.dislike}
                onClick={dislikeVideo}
              >
                <AiFillDislike />
              </span> */}

              {/* SHARE MODAL STARTS*/}
              <ShareModal videoSrc={videoSrc} video={video} />
              {/* SHARE MODAL ENDS */}

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
              {!isSuscbribed ? (
                <button className="suscribe-btn">SUSCRIBED</button>
              ) : (
                <button className="suscribe-btn" onClick={suscribeVideo}>
                  SUSCRIBE
                </button>
              )}
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
