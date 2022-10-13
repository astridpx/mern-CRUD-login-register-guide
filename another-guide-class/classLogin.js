import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

// handle error
// const [error, setError] = useState("");

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    // Auto focus Variable
    this.userInputRef = React.createRef();

    // Variable for the input
    this.state = {
      fullname: "",
      username: "",
      password: "",
      error: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  HandleSubmit = (e) => {
    e.preventDefault();

    // This willl get the value in input onchange
    const data = {
      fullname: this.state.fullname,
      username: this.state.username,
      password: this.state.password,
    };
    // Api url
    const url = "http://localhost:8080/account/";

    // Ajax
    axios
      .post(url, data)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        // status response
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          alert(err.response.data.message);
          // this.setState({ error: err.response.data.message });
        }
      });
  };

  // Auto Focus
  componentDidMount() {
    this.userInputRef.current.focus();
  }

  render() {
    return (
      <div className="login-container">
        <center>
          <h1> Sign Up </h1>
        </center>
        <form onSubmit={this.HandleSubmit}>
          <div className="box">
            <label>Full Name : </label>
            {/* full name */}
            <input
              type="text"
              placeholder="Enter Full Name"
              name="fullname"
              autoComplete="Off"
              ref={this.userInputRef}
              value={this.state.fullname}
              onChange={this.onChange}
              required
            />
            {/* username */}
            <label>Username : </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              autoComplete="Off"
              value={this.state.username}
              onChange={this.onChange}
              required
            />

            {/* password */}
            <label>Password : </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="Off"
              value={this.state.password}
              onChange={this.onChange}
              required
            />
            {/* {<h3>{this.state.error}</h3>}  */}

            {/* button  */}
            <button type="submit">Sign Up</button>
            {/* <p className="logintext">Sign in?</p> */}
            <Link to="/login">
              <p className="logintext">SignIn</p>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
