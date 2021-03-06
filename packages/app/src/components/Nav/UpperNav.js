import React from "react";
import { Link, useHistory } from "react-router-dom";
import StreamIcon from "./stream.png";
import { useVideo } from "../../video-context/VideoContext";
import { GiHamburgerMenu } from "react-icons/gi";
import "./nav.css";

function UpperNav() {
  const { state, dispatch } = useVideo();
  const history = useHistory();
  return (
    <nav className="nav dark text-white">
      <ul className="nav-items">
        <li className="nav-item">
          <span
            className="stacked-list-item ham"
            onClick={() => {
              dispatch({ type: "HAM" });
            }}
            style={{ display: "block" }}
          >
            <GiHamburgerMenu />
          </span>
          <Link to="/" className="nav-logoo mt-1">
            <span style={{ color: "#3edbf0" }}>Glitch</span>
            <span style={{ color: "#f21170" }}>Stream</span>{" "}
            <img src={StreamIcon} alt="stream icon" className="stream-icon" />
          </Link>
        </li>

        <li className="nav-item text-md">
          {state.user === "" ? (
            <Link to="/signin" className="nav-info">
              <span className="full-view">Sign In</span>
            </Link>
          ) : (
            <div className="nav-info">
              <span
                onClick={() => {
                  dispatch({ type: "SIGNOUT" });
                  history.push("/signin");
                }}
              >
                Sign Out
              </span>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default UpperNav;
