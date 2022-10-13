import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

const LoginForm = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/login/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
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
              required
              autoComplete="Off"
              onChange={handleChange}
              value={data.username}
            />

            {/* password */}
            <label>Password : </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={handleChange}
              value={data.password}
            />
            {error && <h3>{error}</h3>}
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
