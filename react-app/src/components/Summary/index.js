import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { timeEstimate } from "../../frontend-utilities/timeEstimate";
import { splitTasks } from "../../frontend-utilities/splitTasks";
import * as listActions from "../../store/list";
import "./Summary.css"

function Summary() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const tasks = useSelector((state) => state.tasks);
  let { listId } = useParams()
  if (listId) {
    listId = parseInt(listId)
  }

  // let numToday = null;
  // let numTomorrow = null;
  // let numOver = null;
  let numCompleted = null;
  let listNameUpdate = null;

  const [currentList, setCurrentList] = useState(null);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [totalTime, setTotalTime] = useState("");
  const [taskCats, setTaskCats] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

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

  useEffect(() => {
    if (currentList) setUpdatedName(currentList.name)
  }, [currentList])

  if (currentList) {
    listNameUpdate = (
      <input className="new-form-input"
        type="text"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        name="Name"></input>
    )
  }



  const numTasks = (
    <div className="num-tasks">
        <h4>{currentTasks.length}</h4>
        <p>tasks</p>
    </div>
  );

  const taskTime = (
    <div className="time-estimated">
        <h4>{totalTime}</h4>
        <p>estimated</p>
    </div>
  );

  // if (taskCats) {
  //   // console.log("taskCats: ", taskCats);
  //   if (taskCats.dueToday.length) {
  //     numToday = (
  //       <div className="num-due-today">
  //         <div className="big-num">
  //           <h2>{taskCats.dueToday.length}</h2>
  //         </div>
  //         <div className="info-type">
  //           <p>due today</p>
  //         </div>
  //       </div>
  //     );
  // }

  // if (taskCats.dueTomorrow.length) {
  //   numTomorrow = (
  //     <div className="num-due-tomorrow">
  //       <div className="big-num">
  //         <h2>{taskCats.dueTomorrow.length}</h2>
  //       </div>
  //       <div className="info-type">
  //         <p>due tomorrow</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (taskCats.overdue.length) {
  //   numOver = (
  //     <div className="num-overdue">
  //       <div className="big-num">
  //         <h2>{taskCats.overdue.length}</h2>
  //       </div>
  //       <div className="info-type">
  //         <p>overdue</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (taskCats && taskCats.completed.length) {
    numCompleted = (
      <div className="num-completed">
          <h4>{taskCats.completed.length}</h4>
          <p>completed</p>
      </div>
    );
  }

  const updateSubmit = async (e) => {
    e.preventDefault();

    const list = { name: updatedName, id: listId };

    return await dispatch(listActions.editList(list));
  };

  const updateListButton = <button className="update-list-button" type="submit" onClick={updateSubmit}>Update</button>

    return (
      <div className="summary-container">
        <div className="summary-box">
          <div className="summary-heading">
            {!currentList ? "All Tasks" : listNameUpdate}
            {currentList ? updateListButton : null}
          </div>

          <div className="info-bar">

              {numTasks}

              {numCompleted}

              {totalTime ? taskTime : null}

          </div>
        </div>
      </div>
    );
  }

  export default Summary;
