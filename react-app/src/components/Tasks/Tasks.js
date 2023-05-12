import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, postTask, deleteTask } from "../../store/task";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const ownerId = useSelector((state) => state.session.user.id)
  const tasksArr = Object.values(tasks);
  const [inputValue, setInputValue] = useState("");

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
  }

  const handleDelete = async (taskId) => {
    await dispatch(deleteTask(taskId));
    await dispatch(loadTasks());
  }

  const handleSmartAdd = () => {

  }

  const handleAddDueDate = () => {
    if (inputValue.includes("^")) {
      const regex = /\^([^!@^~#*=+]+)/;
      setInputValue((prevValue) => prevValue.replace(regex, ""));
    } else {
      setInputValue((prevValue) => prevValue + " ^");
    }
  };


  const handleAddStartDate = () => {
    if (inputValue.includes("~")) {
      const regex = /\^([^!@^~#*=+]+)/;
      setInputValue((prevValue) => prevValue.replace(regex, ""));
    } else {
      setInputValue((prevValue) => prevValue + " ~");
    }
  };

  const handleAddPriority = () => {
    if (inputValue.includes("!")) {
      const regex = /\^([^!@^~#*=+]+)/;
      setInputValue((prevValue) => prevValue.replace(regex, ""));
    } else {
      setInputValue((prevValue) => prevValue + " !");
    }
  };

  const handleAddList = () => {
    if (inputValue.includes("#")) {
      const regex = /\^([^!@^~#*=+]+)/;
      setInputValue((prevValue) => prevValue.replace(regex, ""));
    } else {
      setInputValue((prevValue) => prevValue + " #");
    }
  };

  const handleAddRepeat = () => {
    if (inputValue.includes("*")) {
      const regex = /\^([^!@^~#*=+]+)/;
      setInputValue((prevValue) => prevValue.replace(regex, ""));
    } else {
      setInputValue((prevValue) => prevValue + " *");
    }
  };

  const handleAddLocation = () => {
    if (inputValue.includes("@")) {
      const regex = /\^([^!@^~#*=+]+)/;
      setInputValue((prevValue) => prevValue.replace(regex, ""));
    } else {
      setInputValue((prevValue) => prevValue + " @");
    }
  };

  const handleAddEstimate = () => {
    if (inputValue.includes("=")) {
      const regex = /\^([^!@^~#*=+]+)/;
      setInputValue((prevValue) => prevValue.replace(regex, ""));
    } else {
      setInputValue((prevValue) => prevValue + " =");
    }
  };

  function parseInputString(input) {
    const tagPattern = /([!@^~#*=+])([^!@^~#*=+]+)/g;
    const matches = input.matchAll(tagPattern);
    const payload = {
      owner_id: ownerId,
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
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add Task</button>
        <div>
          <i class="fa-solid fa-calendar-check"
            onClick={handleAddDueDate}></i>
          <i class="fa-solid fa-calendar-day"
            onClick={handleAddStartDate}></i>
          <i class="fa-solid fa-exclamation"
            onClick={handleAddPriority}></i>
          <i class="fa-solid fa-rectangle-list"
            onClick={handleAddList}></i>
          <i class="fa-solid fa-clock-rotate-left"
            onClick={handleAddRepeat}></i>
          <i class="fa-solid fa-location-dot"
            onClick={handleAddLocation}></i>
          <i class="fa-solid fa-stopwatch"
            onClick={handleAddEstimate}></i>
          <i class="fa-solid fa-user"></i>
        </div>
      </form>
      {tasksArr.map((taskObj) => (
        <div key={taskObj.id}>
          {taskObj.name}
          <a onClick={() => handleDelete(taskObj.id)}><i class="fa-solid fa-trash-can"></i></a>
        </div>
      ))}
    </>
  );
}
