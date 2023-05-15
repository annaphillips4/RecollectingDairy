import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, postTask, editTask, deleteTask } from "../../store/task";
import { useParams } from "react-router-dom";
import "./Tasks.css"

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const ownerId = useSelector((state) => state.session.user.id)
  const tasksArr = Object.values(tasks);
  const [inputValue, setInputValue] = useState("");

  const { listId } = useParams()
  let numListId
  listId === undefined ? numListId = false : numListId = parseInt(listId)

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = parseInputString(inputValue);
    let newReview = await dispatch(postTask(payload))

    if (newReview) {
      await dispatch(loadTasks)
    }

    setInputValue('')
  }

  const handleEditTask = async (taskId, bool) => {
    const updatedTask = {
      ...tasks[taskId],
      completed: bool,
    };

    await dispatch(editTask(updatedTask));
    await dispatch(loadTasks());
  };

  const handleDelete = async (taskId) => {
    await dispatch(deleteTask(taskId));
    await dispatch(loadTasks());
  }

  RegExp.escape = function (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
  };

  const handleSmartAdd = (tag) => {
    const escapedTag = RegExp.escape(tag);
    const regex = new RegExp(`${escapedTag}([^!@^~#*=+]+)?`);

    if (inputValue.includes(tag)) {
      setInputValue((prevValue) => prevValue.replace(regex, ""));
    } else {
      setInputValue((prevValue) => prevValue + ` ${tag}`);
    }
  };


  function parseInputString(input) {
    const tagPattern = /([!@^~#*=+])([^!@^~#*=+]+)/g;
    const matches = input.matchAll(tagPattern);
    const payload = {
      owner_id: ownerId,
      list_id: listId
    };

    const nameMatch = /^([^!@^~#*=+]+)/.exec(input);
    if (nameMatch) {
      payload.name = nameMatch[1].trim();
    }

    for (const match of matches) {
      const tag = match[1];
      const value = match[2].trim();

      switch (tag) {
        case "!":
          payload.priority = value;
          break;
        case "@":
          payload.location = value;
          break;
        case "#":
          payload.list = value;
          break;
        case "*":
          payload.repeat = value;
          break;
        case "=":
          payload.estimate = parseInt(value);
          break;
        case "+":
          payload.assignedUser = value;
          break;
        case "^":
          payload.dueDate = value;
          break;
        case "~":
          payload.startDate = value;
          break;
        default:
          break;
      }
    }

    return payload;
  }

  return (
    <>
      <div className="new-task-container">
        <form onSubmit={handleSubmit}>
          <input className="new-task-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a task..."
          />
          <button className="new-task-button" type="submit">Add Task</button>
          <div className="task-icons">
            <i
              className="fa-solid fa-calendar-check"
              onClick={() => handleSmartAdd('^')}
              title="Due Date"
            ></i>
            <i
              className="fa-solid fa-calendar-day"
              onClick={() => handleSmartAdd('~')}
              title="Start Date"
            ></i>
            <i
              className="fa-solid fa-exclamation"
              onClick={() => handleSmartAdd('!')}
              title="Priority"
            ></i>
            <i
              className="fa-solid fa-rectangle-list"
              onClick={() => handleSmartAdd('#')}
              title="Repeat Period"
            ></i>
            <i
              className="fa-solid fa-clock-rotate-left"
              onClick={() => handleSmartAdd('*')}
              title="Repeat Type"
            ></i>
            <i
              className="fa-solid fa-location-dot"
              onClick={() => handleSmartAdd('@')}
              title="Location"
            ></i>
            <i
              className="fa-solid fa-stopwatch"
              onClick={() => handleSmartAdd('=')}
              title="Estimate"
            ></i>
            {/* <i className="fa-solid fa-user"></i> */}
          </div>
        </form>
      </div>

      <div className="divider"></div>

      {tasksArr.map((taskObj) => {
        if (numListId === false || taskObj.listId === numListId) {
          return (
            <div key={taskObj.id} className="task-arr">
              <span>{taskObj.completed && (
                <i
                  className="fa-regular fa-square-check"
                  onClick={() => handleEditTask(taskObj.id, false)}>
                </i>
              )}
              {!taskObj.completed && (
                <i
                  className="fa-regular fa-square"
                  onClick={() => handleEditTask(taskObj.id, true)}>
                </i>
              )}
              <span className="task-name">
                {taskObj.name}
              </span>
              </span>
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => handleDelete(taskObj.id)}>
                </i>
              {/* {taskObj.dueDate} */}
            </div>
          )
        }
        return null
      })}
    </>
  );
}
