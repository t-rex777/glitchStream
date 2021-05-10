import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useVideo } from "../../video-context/VideoContext";

const PrivateRoute = (props) => {
  const { state } = useVideo();
  return (
    <>
      {state.user !== "" ? (
        <Route {...props} />
      ) : (
        <Redirect from={props.path} to="/signin" />
      )}
    </>
  );
};

export default PrivateRoute;
