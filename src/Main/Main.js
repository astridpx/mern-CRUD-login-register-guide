import React from "react";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <h1>You Login Successfully</h1>
      <button onClick={handleLogout}> Logout</button>
    </>
  );
};

export default Main;
