import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, postTask } from "../../store/task";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const tasksArr = Object.values(tasks);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = parseInputString(inputValue);
    console.log(payload); // TODO: Submit the form values
    let newReview = await dispatch(postTask(payload))
    console.log(newReview)
    if (newReview) {
      await dispatch(loadTasks)
    }
  }

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  }

  function parseInputString(input) {
    const tagPattern = /([!@^~#*=+])([^!@^~#*=+]+)/g;
    const matches = input.matchAll(tagPattern);
    const payload = {};

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
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add Task</button>
        <div>
          <i class="fa-solid fa-calendar-check"></i>
          <i class="fa-solid fa-calendar-day"></i>
          <i class="fa-solid fa-exclamation"></i>
          <i class="fa-solid fa-rectangle-list"></i>
          <i class="fa-solid fa-clock-rotate-left"></i>
          <i class="fa-solid fa-location-dot"></i>
          <i class="fa-solid fa-stopwatch"></i>
          <i class="fa-solid fa-user"></i>
        </div>
      </form>
      {tasksArr.map((taskObj) => (
        <div>
          {taskObj.name}
          <a onClick={() => handleDelete(taskObj.id)}><i class="fa-solid fa-trash-can"></i></a>
        </div>
      ))}
    </>
  );
}
