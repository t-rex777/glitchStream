import React from "react";
import { Link } from "react-router-dom";
import StreamIcon from "./stream.png";
import { AiOutlineSearch, AiOutlineLogin } from "react-icons/ai";
import { useVideo } from "../../video-context/VideoContext";
import { GiHamburgerMenu } from "react-icons/gi";
import "./nav.css";

function UpperNav() {
  const { state, dispatch } = useVideo();
  return (
    <nav className="nav dark text-white">
      <ul className="nav-items">
        {/* <li className="nav-item">
          <span
            className="stacked-list-item ham"
            onClick={() => {
              dispatch({ type: "HAM" });
            }}
            style={{ display: "block" }}
          >
            <GiHamburgerMenu />
          </span>
        </li> */}

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

        {/* <li className="nav-item">
          <span className="mobile-view">
            <AiOutlineSearch />
          </span>
          <span>
            <input
              type="text"
              className="nav-search full-view"
              placeholder="Search"
            />
          </span>
        </li> */}

        <li className="nav-item text-md">
          {state.user === "" ? (
            <Link to="/signin" className="nav-info">
              <span className="mobile-view">
                <AiOutlineLogin />
              </span>
              <span className="full-view">Sign In</span>
            </Link>
          ) : (
            <div className="nav-info">
              <span
                className="mobile-view"
                onClick={() => {
                  dispatch({ type: "SIGNOUT" });
                }}
              >
                <AiOutlineLogin />
              </span>
              <span
                className="full-view"
                onClick={() => {
                  dispatch({ type: "SIGNOUT" });
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
