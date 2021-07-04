import React, { useEffect } from "react";
import { useVideo } from "../../video-context/VideoContext";
import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { getUserDetails, setPlaylist } from "./../User/helper";
import { Redirect } from "react-router-dom";

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
    if (!e.target.checked) {
      console.log("unchecked");
      return;
    }

    const obj = {
      name: e.target.value,
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
        await dispatch({ type: "PLAYLIST", payload: userDetails.playlists });
        await dispatch({
          type: "TOAST",
          payload: `Playlist added`,
        });
        await dispatch({ type: "TOAST_STYLE", payload: { display: "block" } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // modal
  const modalClick = (e) => {
    e.preventDefault();
    if (state.user) {
      console.log("modalclicked");
      setModalStyle({ display: "block" });
    }else{
      setRedirect(true)
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
        await dispatch({ type: "PLAYLIST", payload: userDetails.playlists });
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
              <p className="mt-3 mb-3">Save to...</p>
              {/*NOTE: check if the video is present or not then check it */}
              <form onSubmit={onSubmit}>
                {state.user &&
                  state.user.playlists.map((playlist) => {
                    return (
                      <div key={playlist._id}>
                        <input
                          type="checkbox"
                          className="mr-1 mb-2"
                          id={playlist._id}
                          name={playlist._id}
                          // value={playlist.name}
                          defaultValue={playlist.name}
                          onClick={addPlaylist}
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
                <label htmlFor="newPlaylist">New Playlist</label> <br />
                <input
                  type="text"
                  value={inputText}
                  id="newPlaylist"
                  onChange={(e) => setInputText(e.target.value)}
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
