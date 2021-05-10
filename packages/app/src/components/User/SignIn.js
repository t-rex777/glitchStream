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

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser(user)
      .then((data) => {
        dispatch({ type: "SIGNIN", payload: data });
        dispatch({ type: "PLAYLIST", payload: data.playlists });
        dispatch({ type: "HISTORY", payload: data.history });
        console.log({data})
        setRedirect(true);
      })
      .catch((err) => console.log(err));

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
