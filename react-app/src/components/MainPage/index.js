import React from "react";
import { useSelector } from "react-redux";
import Lists from "../Lists";
import Tasks from "../Tasks";
import ProfileButton from "../Navigation/ProfileButton"
import Summary from "../Summary"
import "./main.css"

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="app-container">
      <div className="top-nav-bar">

        <div className="search-container">
          <i id="search-icon" className="fa-solid fa-magnifying-glass"></i>
          <div className="search-bar">
            <input type="text" placeholder="Search..." ></input>
          </div>
        </div>

        <div className="profile-button">
          <ProfileButton user={sessionUser} />
        </div>
      </div>

      <div className="content-container">
        <div className="sidebar">
          <Lists />

        </div>

        <div className="tasks">
          <Tasks />
        </div>

        <div className="summary">
          <Summary />
        </div>
      </div>
    </div>
  );
}

  export default App;
