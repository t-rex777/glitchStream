import React from "react";
import "./banner.css";
function Banner() {


  return (
    <div className="banner">
      <h1 className="banner_heading">Welcome to GlitchStream</h1>
      <p className="banner_desc">
        GlitchStream is an online sports and e-sports video library
      </p>
      {/* <Link to={`video/${random}`}>
        <button className="banner_button">watch now</button>
      </Link> */}
      {/* <div className="banner_lower"></div> */}
    </div>
  );
}

export default Banner;
