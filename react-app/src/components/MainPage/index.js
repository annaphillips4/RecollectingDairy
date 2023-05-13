import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Lists from "../Lists";
import Tasks from "../Tasks";
import SearchBar from "../SearchBar";
import Summary from "../Summary"
import "./main.css"

function App() {

    return (
      <div className="app-container">
        <div className="top-nav-bar">
          <i id="search-icon" className="fa-solid fa-magnifying-glass"></i>
          <div className="search-bar">
            <input type="text" placeholder="Search..." ></input>
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
