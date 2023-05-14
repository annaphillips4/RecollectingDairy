import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

    return (
      <div className="container">
        <div className="summary-box">
          <div className="summary-heading">
            <h2>{!currentList ? "All Tasks" : currentList.name}</h2>
          </div>
          <div className="info-bar">
            <div className="task-load">
              <div className="num-tasks">
                <div className="big-num">
                  <h2>{currentTasks.length}</h2>
                </div>
                <div className="info">
                  <p>tasks</p>
                </div>
              </div>
              <div className="time-estimated">

              </div>
            </div>

            <div className="num-due-today">

            </div>
            <div className="num-due-tomorrow">

            </div>
            <div className="num-overdue">

            </div>
            <div className="num-completed">

            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Summary;
