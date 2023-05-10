import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "../../store/task";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const tasksArr = Object.values(tasks);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    const formValues = parseInputString(inputValue);
    console.log(formValues); // TODO: Submit the form values
  }

  function parseInputString(input) {
    const tagPattern = /([!@^~#*=+])([^!@^~#*=+]+)/g;
    const matches = input.matchAll(tagPattern);
    const formValues = {};

    const nameMatch = /^([^!@^~#*=+]+)/.exec(input);
    if (nameMatch) {
      formValues.name = nameMatch[1].trim();
    }

    for (const match of matches) {
      const tag = match[1];
      const value = match[2].trim();

      switch (tag) {
        case "!":
          formValues.priority = value;
          break;
        case "@":
          formValues.location = value;
          break;
        case "#":
          formValues.list = value;
          break;
        case "*":
          formValues.repeat = value;
          break;
        case "=":
          formValues.estimate = value;
          break;
        case "+":
          formValues.assignedUser = value;
          break;
        case "^":
          formValues.dueDate = value;
          break;
        case "~":
          formValues.startDate = value;
          break;
        default:
          break;
      }
    }

    return formValues;
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
        <div>{taskObj.name}</div>
      ))}
    </>
  );
}
