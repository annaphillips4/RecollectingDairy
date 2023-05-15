import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton"
import Lists from "../Lists";
import Tasks from "../Tasks";
import Summary from "../Summary"
import "./MainPage.css"

function Main() {
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const tasks = useSelector((state) => state.tasks);

  let taskArr = Object.values(tasks);

  const [query, setQuery] = useState("")

  const show = () => {
    document.querySelector(".search-results").classList.remove("hidden");
  };

  const hide = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      document.querySelector(".search-results").classList.add("hidden");
    };
  };

  const edit = (listId, id) => {
    document.querySelector(".search-results").classList.add("hidden");
    history.push(`/app/list/${listId}/${id}`);
    setQuery("");
  };

  return (
    <div className="app-container">
      <div className="top-nav-bar">

        <div className="search-container">
          <i id="menu-icon" className="fa-solid fa-bars"></i>
          <div className="search-bar" onBlur={(e) => hide(e)}>
            <input onChange={(e) => setQuery(e.target.value)} onFocus={() => show()} className="search-input" type="text" placeholder="Search..." ></input>
          </div>
          <i id="search-icon" className="fa-solid fa-magnifying-glass"></i>

          <div className="search-results hidden">
            {taskArr.filter(task => {
              if (query === "") {
                return null;
              } else if (task.name.toLowerCase().includes(query.toLowerCase())) {
                return tasks;
              } else return null;
            }).map((post, idx) => (
              <div className="search-results-box" key={idx}>
                <div className="search-card" onMouseDown={() => edit(post.listId, post.id)}>
                  <span>{post.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-button">
          <ProfileButton user={sessionUser} />
        </div>
      </div>

      <div className="content-container">
        <div className="sidebar">
          <div className="sidebar-logo">
            <Link to={"/app"}></Link>
          </div>
          <Lists />
        </div>

        <div className="tasks-container">
          <Tasks />
        </div>

        <div className="summary">
          <Summary />
        </div>
      </div>
    </div>
  );
}

export default Main;
