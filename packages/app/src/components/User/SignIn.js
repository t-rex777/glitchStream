import React, { useState } from "react";
import Base from "./../Base/Base";
import "./user.css";
import { signInUser } from "./helper";
import { useVideo } from "../../video-context/VideoContext";
import { Redirect } from "react-router-dom";

function SignIn() {
  const { dispatch } = useVideo();
  const [user, setUser] = useState({
    email: "admin@gmail.com",
    password: "admin",
  });
  const [redirect, setRedirect] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });
    const data = await signInUser(user);

    try {
      if (data !== undefined) {
        const { user: userDetails, accessToken, refreshToken } = data;
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({ type: "LOADING_STYLE", payload: { display: "none" } });
        dispatch({ type: "SIGNIN", payload: userDetails });
        dispatch({ type: "PLAYLIST", payload: userDetails.playlists });
        dispatch({ type: "HISTORY", payload: userDetails.history });
        dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Base>
      {redirect && <Redirect to="/" />}
      <form className="form">
        <h1 className="mb-4">Sign In</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          className="form-item mb-2"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          className="form-item mb-4"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-success text-s"
        >
          Sign In
        </button>
        <p>{user.email}</p>
        <p>{user.password}</p>
      </form>
    </Base>
  );
}

export default SignIn;
