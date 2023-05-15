import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton"
import Lists from "../Lists";
import Tasks from "../Tasks";
import TaskEdit from "../TaskEdit";
// import Summary from "../Summary"
import "./TaskInfo.css"

function TaskInfo() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="app-container">
      <div className="top-nav-bar">

        <div className="search-container">
          <i id="menu-icon" className="fa-solid fa-bars"></i>
          <div className="search-bar">
            <input className="search-input" type="text" placeholder="Search..." ></input>
          </div>
          <i id="search-icon" className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="profile-button">
          <ProfileButton user={sessionUser} />
        </div>
      </div>

      <div className="content-container">
        <div className="sidebar">
          <div className="sidebar-logo">
            <a href="/app"></a>
          </div>
          <Lists />
        </div>

        <div className="tasks-container">
          <Tasks />
        </div>

        <div className="task-info">
          <TaskEdit />
        </div>
      </div>
    </div>
  );
}

export default TaskInfo;
