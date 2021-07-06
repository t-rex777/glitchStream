import React, { useState } from "react";
import Base from "./../Base/Base";
import "./user.css";
import { signUpUser } from "./helper";
import { useVideo } from "../../video-context/VideoContext";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
  const { dispatch } = useVideo();
  const history = useHistory()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
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
    if (user.password !== user.re_password) {
      return alert("both passwords should be exactly same!");
    }
    dispatch({ type: "LOADING_STYLE", payload: { display: "block" } });
    const data = await signUpUser(user);

    try {
      if (data !== undefined) {
        dispatch({
          type: "TOAST",
          payload: `Welcome aboard!`,
        });
        dispatch({ type: "TOAST_STYLE", payload: { display: "block" } });
       history.push("/signin")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Base>
      <div className="user">
        <form className="form">
          <h1 className="mb-4">Sign Up</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
            className="form-item mb-2"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
          <label htmlFor="re_password">Re-password</label>
          <input
            type="password"
            name="re_password"
            id="re_password"
            value={user.re_password}
            onChange={handleChange}
            className="form-item mb-4"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-success text-s"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-2">
          Already have an account?{" "}
          <Link className="text-success" to="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </Base>
  );
}

export default SignUp;
