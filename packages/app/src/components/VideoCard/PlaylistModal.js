import React, { useEffect } from "react";
import { useVideo } from "../../video-context/VideoContext";
import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import {
  getUserDetails,
  removeUserPlaylist,
  setPlaylist,
} from "./../User/helper";
import { Redirect } from "react-router-dom";
import { RiOpenSourceLine } from "react-icons/ri";

function PlaylistModal({ videoId }) {
  const { state, dispatch } = useVideo();

  const [modalStyle, setModalStyle] = useState({ display: "none" });
  const [inputText, setInputText] = useState("");
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const addPlaylist = async (e) => {
    dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });

    if (!state.user) {
      return setRedirect(true);
    }
    console.log(e.target.defaultValue)
    if (e.target.checked) {
      const obj = {
        name: e.target.defaultValue,
        videos: videoId,
      };
      const data = await setPlaylist(obj);
      try {
        dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });
        if (data !== undefined) {
          dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });

          setNewPlaylist([]);
          const userDetails = await getUserDetails();
          await dispatch({ type: "SIGNIN", payload: userDetails });
          await dispatch({
            type: "SET_PLAYLIST",
            payload: userDetails.playlists,
          });
          await dispatch({
            type: "TOAST",
            payload: `Playlist added`,
          });
          await dispatch({ type: "TOAST_STYLE", payload: { display: "none" } });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
      }
    } else {
      const playlistId = e.target.id;
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

      const data = await removeUserPlaylist(playlistId, obj);
      try {
        if (data !== undefined) {
          dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
          const userDetails = await getUserDetails();
          dispatch({ type: "SIGNIN", payload: userDetails });
          dispatch({ type: "SET_PLAYLIST", payload: userDetails.playlists });
          dispatch({
            type: "TOAST",
            payload: `Video removed from ${selectedPlaylist.name}`,
          });
          dispatch({ type: "TOAST_STYLE", payload: { display: "block" } });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  // modal
  const modalClick = (e) => {
    e.preventDefault();
    if (state.user) {
      console.log("modalclicked");
      setModalStyle({ display: "block" });
    } else {
      setRedirect(true);
    }
  };
  const cancelModal = (e) => {
    e.preventDefault();
    setModalStyle({ display: "none" });
  };

  useEffect(() => {
    window.onclick = (e) => {
      if (e.target.className === "modal-active") {
        setModalStyle({ display: "none" });
      }
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });
    setNewPlaylist([...newPlaylist, inputText]);
    const obj = {
      name: inputText,
      videos: videoId,
    };
    const data = await setPlaylist(obj);
    try {
      if (data !== undefined) {
        dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
        setNewPlaylist([]);
        const userDetails = await getUserDetails(state);
        await dispatch({ type: "SIGNIN", payload: userDetails });
        await dispatch({
          type: "SET_PLAYLIST",
          payload: userDetails.playlists,
        });
        await dispatch({
          type: "TOAST",
          payload: `Playlist added`,
        });
        await dispatch({ type: "TOAST_STYLE", payload: { display: "block" } });
      }
      setInputText("");
    } catch (error) {
      console.log(error);
    }
  };

  const isOnPlaylist = (playlistId) => {
    if (state.user.playlists) {
      const res = state.user.playlists.filter(
        (item) => item._id === playlistId
      );
      if (res !== undefined) {
        const res2 = res[0].videos.find((ele) => ele._id === videoId);
        if (res2 !== undefined) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
  };

  return (
    <>
      {!redirect ? (
        <>
          <span className="interaction-item modal-btn" onClick={modalClick}>
            <MdPlaylistAdd />
            <p>Save</p>
          </span>
          <div className="modal-active" style={modalStyle}>
            <div className="modal-contents">
              <span className="modal-close" onClick={cancelModal}>
                &times;
              </span>
              <p className="mt-3 mb-2" align="start">Save to...</p>
              {/*NOTE: check if the video is present or not then check it */}
              <form onSubmit={onSubmit}>
                {state.user &&
                  state.user.playlists.map((playlist) => {
                    return (
                      <div key={playlist._id} className="playlists">
                        <input
                          type="checkbox"
                          className="mr-1 mb-2"
                          id={playlist._id}
                          name={playlist._id}
                          checked={isOnPlaylist(playlist._id)}
                          // value={playlist.name}
                          defaultValue={playlist.name}
                          onChange={addPlaylist}
                        />
                        <label htmlFor={playlist._id}>{playlist.name}</label>
                        <br />
                      </div>
                    );
                  })}
                {newPlaylist.map((playlist, i) => {
                  return (
                    <div key={i}>
                      <input
                        type="checkbox"
                        className="mr-1 mb-2"
                        id={i}
                        name={i}
                        // value={playlist}
                        defaultValue={playlist}
                        onClick={addPlaylist}
                      />
                      <label htmlFor={i}>{playlist}</label>
                      <br />
                    </div>
                  );
                })}
              
                <input
                  type="text"
                  value={inputText}
                  id="newPlaylist"
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="add new playlist"
                />
                <br />
                <button
                  type="submit"
                  className="playlist-submit m-2"
                  disabled={!inputText}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Redirect to="/signin" />
      )}
    </>
  );
}

export default PlaylistModal;
