import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const [error, setError] = useState("");

  const configuration = {
    method: "post",
    url: "http://localhost:8080/login/login",
    data: {
      username,
      password,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post request with axios
    axios(configuration)
      .then((res) => {
        // set the token
        localStorage.setItem("token", res.data);
        window.location = "/";

        alert(res.data.message);
        setLogin(true);

        // Clear the field after submiting
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
  return (
    <>
      <div className="login-container">
        <center>
          <h1> Login Your Account</h1>
        </center>
        <form onSubmit={handleSubmit}>
          <div className="box">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setError("")} // Hide the Error message
              required
            />
            {/* Display error */}
            {login ? "" : <h3>{error}</h3>}

            {/* button  */}
            <button type="submit">Login</button>
            {/* <p className="logintext">Sign in?</p> */}

            <Link to="/signup">
              <p className="logintext">Sign Up Here</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
