import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { timeEstimate } from "../../frontend-utilities/timeEstimate";
import "./Summary.css"

function Summary() {
  // const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const tasks = useSelector((state) => state.tasks);
  let { listId } = useParams()
  if (listId) {
    listId = parseInt(listId)
  }

  const [currentList, setCurrentList] = useState(null);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [totalTime, setTotalTime] = useState("");

  useEffect(() => {
    const taskArr = Object.values(tasks);
    if (listId) {
      setCurrentList(lists[listId]);
      setCurrentTasks(taskArr.filter((task) => (task.listId === listId)));
    } else {
      setCurrentList(null);
      setCurrentTasks(taskArr);
    }
  }, [listId, lists, tasks]);

  useEffect(() => {
    setTotalTime(timeEstimate(currentTasks))
  }, [currentTasks]);

    return (
      <div className="summary-container">
        <div className="summary-box">
          <div className="summary-heading">
            <h3>{!currentList ? "All Tasks" : currentList.name}</h3>
          </div>

          <div className="info-bar">
              <div className="num-tasks">
                <h4>{currentTasks.length}</h4>
                <p>tasks</p>
              </div>

              <div className="time-estimated">
                <h4>{totalTime}</h4>
                <p>estimated</p>
              </div>

              <div className="num-completed">
              </div>
          </div>
        </div>
      </div>
    );
  }

  export default Summary;
