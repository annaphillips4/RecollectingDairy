import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { timeEstimate } from "../../frontend-utilities/timeEstimate";
import { splitTasks } from "../../frontend-utilities/splitTasks";
import "./Summary.css"

function Summary() {
  // const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const tasks = useSelector((state) => state.tasks);
  let { listId } = useParams()
  if (listId) {
    listId = parseInt(listId)
  }

  let numToday = null;
  let numTomorrow = null;
  let numOver = null;
  let numCompleted = null;

  const [currentList, setCurrentList] = useState(null);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [totalTime, setTotalTime] = useState("");
  const [taskCats, setTaskCats] = useState(null);

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
    setTotalTime(timeEstimate(currentTasks));
    setTaskCats(splitTasks(currentTasks));
  }, [currentTasks]);

  const numTasks = (
  <div className="num-tasks">
    <div className="big-num">
      <h2>{currentTasks.length}</h2>
    </div>
    <div className="info-type">
      <p>tasks</p>
    </div>
  </div>
);

const taskTime = (
  <div className="time-estimated">
    <div className="big-time">
      <h2>{totalTime}</h2>
    </div>
    <div className="info-type">
      <p>estimated</p>
    </div>
  </div>
);

if (taskCats) {
  // console.log("taskCats: ", taskCats);
  if (taskCats.dueToday.length) {
    numToday = (
      <div className="num-due-today">
        <div className="big-num">
          <h2>{taskCats.dueToday.length}</h2>
        </div>
        <div className="info-type">
          <p>due today</p>
        </div>
      </div>
    );
  }

  if (taskCats.dueTomorrow.length) {
    numTomorrow = (
      <div className="num-due-tomorrow">
        <div className="big-num">
          <h2>{taskCats.dueTomorrow.length}</h2>
        </div>
        <div className="info-type">
          <p>due tomorrow</p>
        </div>
      </div>
    );
  }

  if (taskCats.overdue.length) {
    numOver = (
      <div className="num-overdue">
        <div className="big-num">
          <h2>{taskCats.overdue.length}</h2>
        </div>
        <div className="info-type">
          <p>overdue</p>
        </div>
      </div>
    );
  }

  if (taskCats.completed.length) {
    numCompleted = (
      <div className="num-completed">
        <div className="big-num">
          <h2>{taskCats.completed.length}</h2>
        </div>
        <div className="info-type">
          <p>completed</p>
        </div>
      </div>
    );
  }

}
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
