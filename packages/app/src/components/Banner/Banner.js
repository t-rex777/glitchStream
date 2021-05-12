import React, { useEffect, useState } from "react";
import "./banner.css";
import { Link } from "react-router-dom";
import { useVideo } from "../../video-context/VideoContext";
function Banner() {
  const { state } = useVideo();
  const [random, setRandom] = useState(0);
  useEffect(() => {
    console.log(state.videos);
    // setRandom(Math.ceil(Math.random() * 6));
    // console.log(state.videos[random])
  }, []);
  return (
    <div className="banner">
      {console.log(state.videos)}
      <h1 className="banner_heading">Welcome to GlitchStream</h1>
      <p className="banner_desc">GlitchStream is an online video library </p>
      <Link to={""}>
        <button className="banner_button">watch now</button>
      </Link>
      {/* <div className="banner_lower"></div> */}
    </div>
  );
}

export default Banner;
