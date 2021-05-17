import React from "react";
import { AiFillHome, AiOutlineHistory, AiTwotoneLike } from "react-icons/ai";
import { MdPlaylistAddCheck } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useVideo } from "../../video-context/VideoContext";
function SideNav() {
  const { state} = useVideo();
  const {ham} = state;
  return (
    <div
      className={` ${ham ? "view-mobile" : "big-view"}`}
      style={ham ? { transition: "300ms" } : { transition: "300ms" }}
    >
      {/* <span
        className="stacked-list-item ham"
        onClick={()=>{
          dispatch({type:"HAM"})
        }}
        style={ham ? { display: "block" } : { display: "none" }}
      >
        <GiHamburgerMenu />
      </span> */}

      <ul
        className="stacked-list"
        style={ham ? { left: "-200px" } : { left: "0px" }}
      >
        {/* <li className="stacked-list-item cross" onClick={()=>{
          dispatch({type:"HAM"})
        }}>
          <h3>
            <ImCross />
          </h3>
        </li> */}

        <Link to="/" style={{ textDecoration: "none" }}>
          <li className="stacked-list-item">
            <h3>
              <AiFillHome /> Home
            </h3>
          </li>
        </Link>

        <Link to="/history" style={{ textDecoration: "none" }}>
          <li className="stacked-list-item">
            <h3>
              <AiOutlineHistory /> History
            </h3>
          </li>
        </Link>

        <Link to="/playlist" style={{ textDecoration: "none" }}>
          <li className="stacked-list-item">
            <h3>
              <MdPlaylistAddCheck /> Playlists
            </h3>
          </li>
        </Link>

        <Link to="/likedvideos" style={{ textDecoration: "none" }}>
          <li className="stacked-list-item">
            <h3>
              <AiTwotoneLike /> Liked Videos
            </h3>
          </li>
        </Link>
        <hr />

        <li className="stacked-list-item">
          <h3>
            <RiVideoFill /> Suscriptions
          </h3>
        </li>
        {state.user &&
          state.user.suscriptions.map((sus, i) => {
            return (
              <li className="stacked-list-item" key={i}>
                {state.videos.forEach(vid=>{
                  if(vid.uploadedBy !== `${sus}`){
                    return;
                  }
                    <span>{vid.uploadedBy}</span>
                })}
                {sus}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default SideNav;
