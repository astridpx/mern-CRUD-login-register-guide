import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

// Set The Value
const SignUp = () => {
  const userRef = useRef();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);

  // handle error
  const [error, setError] = useState("");

  const configuration = {
    method: "post",
    url: "http://localhost:8080/account/",
    data: {
      fullname,
      username,
      password,
    },
  };

  // handle the form submit
  const HandleSubmit = (e) => {
    e.preventDefault();

    // Post request with axios
    axios(configuration)
      .then((res) => {
        alert(res.data.message);
        setSignUp(true);

        // Clear the field after submiting
        setFullname("");
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          setError(err.response.data.message);
        }
      });
  };

  // Input Focus on the fullname field to start typing
  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <>
      <div className="login-container">
        <center>
          <h1> Sign Up </h1>
        </center>
        <form onSubmit={(e) => HandleSubmit(e)}>
          <div className="box">
            {/* full name */}
            <label>Full Name : </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              name="fullname"
              autoComplete="Off"
              ref={userRef} // focus onload
              onChange={(e) => setFullname(e.target.value)}
              onClick={() => setError("")} // Hide the Error message
              value={fullname}
              required
            />
            {/* username */}
            <label>Username : </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              autoComplete="Off"
              onChange={(e) => setUsername(e.target.value)}
              onClick={() => setError("")} // Hide the Error message
              value={username}
              required
            />

            {/* password */}
            <label>Password : </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="Off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setError("")} // Hide the Error message
              required
            />

            {/* Display error */}
            {signUp ? "" : <h3>{error}</h3>}

            {/* button  */}
            <button type="submit">Sign Up</button>
            {/* <p className="logintext">Sign in?</p> */}
            <Link to="/login">
              <p className="logintext">SignIn</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
