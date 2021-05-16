import React from "react";
import { useVideo } from "../../video-context/VideoContext";
import Base from "./../Base/Base";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./playlist.css";
import { getUserDetails, removeUserPlaylist } from "../User/helper";

function Playlist() {
  const { state, dispatch } = useVideo();

  const deleteUserPlaylist = async (playlistId, videoId) => {
    dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });

    const finalPlaylist = [];
    const selectedPlaylist = state.playlist.find(
      (vid) => vid._id === playlistId
    );
    selectedPlaylist.videos.forEach((item) => {
      if (item._id !== videoId) {
        finalPlaylist.push(item);
      }
    });

    const obj = {
      name: selectedPlaylist.name,
      _id: playlistId,
      videos: finalPlaylist,
    };

    const data = await removeUserPlaylist(state.user._id, playlistId, obj);
    try {
      if (data !== undefined) {
        dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
        const userDetails = await getUserDetails(state.user._id);
        dispatch({ type: "SIGNIN", payload: userDetails });
        dispatch({ type: "PLAYLIST", payload: userDetails.playlists });
        dispatch({
          type: "TOAST",
          payload: `Video removed from ${selectedPlaylist.name}`,
        });
        dispatch({ type: "TOAST_STYLE", payload: { display: "block" } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Base>
      <h1 style={{ marginTop: "100px" }}>Playlist</h1>
      {state.playlist.map((video) => {
        return (
          <div key={video._id} className="playlist-card mt-4">
            <h2 className="ml-3">{video.name}</h2>

            <div className="videoPlaylist">
              {video.videos.map((vid, index) => {
                return (
                  <div className="videoCard" key={index}>
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
                        <p className="text-gray text-xs m-1">
                          {vid.uploadedBy}
                        </p>
                      </span>
                    </span>
                    <span
                      className="deletePlaylist"
                      onClick={() => {
                        deleteUserPlaylist(video._id, vid._id);
                      }}
                    >
                      <AiFillDelete />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Base>
  );
}

export default Playlist;
