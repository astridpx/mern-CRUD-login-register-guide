import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./components/Login";
import SignUp from "./components/SignUp";
import Main from "./Main/Main";
// import Navbar from "./components/Navbar.component";

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<LoginForm />} />
        <Route path="/" exact element={<Navigate replace to={"/login"} />} />
      </Routes>
    </>
  );
}

export default App;
