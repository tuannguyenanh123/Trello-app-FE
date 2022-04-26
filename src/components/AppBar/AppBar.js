import React from "react";
import "./AppBar.scss";

const AppBar = ({ darkMode, setStatusTheme }) => {
  console.log(darkMode);
  return (
    <>
      <nav className="navbar-app">
        <span>app bar</span>

        <div className="dark-mode">
          <span style={{ color: "yellow" }}>&#9788;</span>
          <div className="custome-input">
            <input
              type="checkbox"
              id="toggle"
              onChange={() => {
                setStatusTheme(!darkMode);
              }}
            />
            <label htmlFor="toggle"></label>
          </div>
          <span style={{ color: "grey" }}>&#9789;</span>
        </div>
      </nav>
    </>
  );
};

export default AppBar;
