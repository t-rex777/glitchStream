import React, { useEffect } from "react";
import { useVideo } from "../../video-context/VideoContext";
import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { getUserDetails, setPlaylist } from "./../User/helper";
import { Redirect } from "react-router-dom";

function PlaylistModal({ videoId }) {
  const { state, dispatch } = useVideo();

  const [modalStyle, setModalStyle] = useState({ display: "none" });
  const [inputText, setInputText] = useState();
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const addPlaylist = (e) => {
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
    setPlaylist(state.user._id, obj)
      .then(async (data) => {
        setNewPlaylist([]);
        const userDetails = await getUserDetails(state.user._id);
        dispatch({ type: "SIGNIN", payload: userDetails });
        dispatch({ type: "PLAYLIST", payload: userDetails.playlists });
        dispatch({
          type: "TOAST",
          payload: `Playlist added`,
        });
        dispatch({ type: "TOAST_STYLE", payload: { display: "block" } });
      })
      .catch((err) => console.log(err));
  };
  // modal
  const modalClick = (e) => {
    e.preventDefault();
    console.log("modalclicked");
    setModalStyle({ display: "block" });
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

              <form>
                {state.user &&
                  state.user.playlists.map((playlist) => {
                    return (
                      <div key={playlist._id}>
                        <input
                          type="checkbox"
                          className="mr-1 mb-2"
                          id={playlist._id}
                          name={playlist._id}
                          value={playlist.name}
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
                        value={playlist}
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
                  onChange={(e) => {
                    setInputText(e.target.value);
                  }}
                />
                <br />
                <button
                  type="submit"
                  className="playlist-submit m-2"
                  disabled={!inputText}
                  onClick={(e) => {
                    e.preventDefault();
                    setInputText("");
                    setNewPlaylist([...newPlaylist, inputText]);
                  }}
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
