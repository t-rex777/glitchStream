import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { useVideo } from "../../video-context/VideoContext";
import { getVideoById } from "./helper";
import { AiFillLike } from "react-icons/ai";

import {
  deleteSuscription,
  getUserDetails,
  setHistory,
  setLikeVideo,
  setSuscription,
  updateLikedVideos,
} from "./../User/helper";

import Base from "./../Base/Base";
import PlaylistModal from "./PlaylistModal";
import ShareModal from "./ShareModal";
import SuggestedVideos from "../SuggestedVideos/SuggestedVideos";

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
     window.scrollTo(0, 0);
    //fetching the video details
    (async () => {
      const video = await getVideoById(videoId);
      dispatch({ type: "SET_VIDEO", payload: video });
    })();
    //checking if the video is already liked or not
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
        await setHistory(videoId);
        try {
          console.log("history");
          const userDetails = await getUserDetails();
          await dispatch({ type: "SIGNIN", payload: userDetails });
          await dispatch({ type: "SET_HISTORY", payload: userDetails.history });
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [videoId]);

  // checking if the video is already suscribed or not
  useEffect(() => {
    user && user.suscriptions.includes(video.uploadedBy)
      ? setIsSuscbribed(true)
      : setIsSuscbribed(false);
  }, [video]);

  // liking and disliking the video
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
          // dislike
          const data = await updateLikedVideos({ likedVideos: finalVideoIds });
          try {
            if (data !== undefined) {
              dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
              setIconColor({ ...iconColor, like: { color: "#fff" } });
              const userDetails = await getUserDetails();
              dispatch({ type: "SIGNIN", payload: userDetails });
              dispatch({
                type: "SET_LIKED_VIDEOS",
                payload: userDetails.likedVideos,
              });
            }
          } catch (error) {
            console.log(error);
          }
        })();
        return;
      }
      // like
      const data2 = await setLikeVideo(videoId);
      console.log(data2);
      try {
        if (data2 !== undefined) {
          dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
          setIconColor({ ...iconColor, like: { color: "red" } });
          const userDetails = await getUserDetails();
          dispatch({ type: "SIGNIN", payload: userDetails });
          dispatch({
            type: "SET_LIKED_VIDEOS",
            payload: userDetails.likedVideos,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setRedirect(true);
    }
  };

  //suscribing the video
  const suscribeVideo = async () => {
    if (user) {
      dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });

      if (
        user.suscriptions.find((element) => element === `${video.uploadedBy}`)
      ) {
        console.log("already suscribed!");
        let finalSuscriptions = [];
        user.suscriptions.forEach((element) => {
          if (element !== video.uploadedBy) {
            finalSuscriptions.unshift(element);
          }
        });
        const data = await deleteSuscription(finalSuscriptions);
        try {
          if (data !== undefined) {
            dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
            setIsSuscbribed(false);
            const userDetails = await getUserDetails();
            console.log(userDetails);
            dispatch({ type: "SIGNIN", payload: userDetails });
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
      var obj = {
        suscriptions: video.uploadedBy,
      };
      const data = await setSuscription(obj);

      try {
        if (data !== undefined) {
          dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
          setIsSuscbribed(true);
          const userDetails = await getUserDetails();
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
            <div
            className="video-player"
              // style={{
              //   paddingBottom: "42%",
              //   position: "relative",
              //   width: "95%",
              // }}
            >
              <iframe
                className="embed-video"
                src={videoSrc + video.videoId + "?autoplay=1"}
                title="valorant"
                allowFullScreen
                allow="autoplay"
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

              {/* <ShareModal videoSrc={videoSrc} video={video} /> */}

              <PlaylistModal videoId={videoId} />
            </div>
            <h1 className="mt-2 mb-3 text-md">{video.name}</h1>
            <hr />
            <div className="uploader-info">
              <span className="video-uploader mt-2">
                <img src={video.avatar} alt="avatar" />
                <span>
                  <h3>{video.uploadedBy}</h3>
                  <p className="video-desc mt-4">{video.description}</p>
                </span>
              </span>

              <button className="suscribe-btn" onClick={suscribeVideo}>
                {isSuscbribed ? "SUSCRIBED" : "SUSCRIBE"}
              </button>
            </div>
            <SuggestedVideos
              category={video.category}
              currentVideo={video._id}
            />
          </>
        ) : (
          <h1>no videos found</h1>
        )}
      </div>
    </Base>
  );
}

export default VideoPage;
