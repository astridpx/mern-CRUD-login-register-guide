import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

// Set The Value
const SignUp = () => {
  const userRef = useRef();

  const [data, setData] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  // handle error
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  // handle input change on change
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // handle the form submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post request with axios
      const url = "http://localhost:8080/account/";
      const { data: res } = await axios.post(url, data);
      // navigate("/login");
      alert(res.message);
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

  // Input Focus on load
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Clear the Error Message if the user start typing
  useEffect(() => {
    let isClean = true;
    setError("");

    // clean uo
    return () => {
      isClean = false;
    };
  }, [data.fullname, data.username, data.password]); //dependencies from the input

  return (
    <>
      <div className="login-container">
        <center>
          <h1> Sign Up </h1>
        </center>
        <form onSubmit={HandleSubmit}>
          <div className="box">
            <label>Full Name : </label>
            {/* full name */}
            <input
              type="text"
              placeholder="Enter Full Name"
              name="fullname"
              autoComplete="Off"
              ref={userRef} // focus onload
              onChange={handleChange}
              value={data.fullname}
              required
            />
            {/* username */}
            <label>Username : </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              autoComplete="Off"
              onChange={handleChange}
              value={data.username}
              required
            />

            {/* password */}
            <label>Password : </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="Off"
              value={data.password}
              onChange={handleChange}
              required
            />
            {error && <h3>{error}</h3>}
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
