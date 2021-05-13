import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import StreamIcon from "./stream.png";
import { AiOutlineSearch, AiOutlineLogin } from "react-icons/ai";
import { useVideo } from "../../video-context/VideoContext";
function UpperNav() {
  const { state, dispatch } = useVideo();
  const [scroll, setScroll] = useState(false);
  // const onKeyDown = (event) => { console.log(event) }

  // useEffect(() => {
  //   window.addEventListener('keydown', onKeyDown)

  //   return () => { window.removeEventListener('keydown', onKeyDown) }
  // }, [])
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 100) {
  //       setScroll(true);
  //     } else {
  //       setScroll(false);
  //     }
  //   });

  //   return () => window.removeEventListener("scroll",()=>console.log("remove"));
  // }, []);
  return (
    <nav className={`nav dark text-white ${scroll && "nav-black"}`}>
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/" className="nav-logoo">
            <span style={{ color: "#3edbf0" }}>Glitch</span>
            <span style={{ color: "#f21170" }}>Stream</span>{" "}
            <img src={StreamIcon} alt="stream icon" className="stream-icon" />
          </Link>
        </li>

        <li className="nav-item">
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
        </li>

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
