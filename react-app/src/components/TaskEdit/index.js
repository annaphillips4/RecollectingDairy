import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as taskActions from "../../store/task";
import "./TaskEdit.css";

const TaskEdit = () => {
  const dispatch = useDispatch();

  const loadTasks = useSelector((state) => state.tasks);

  let { taskId } = useParams()
  if (taskId) {
    taskId = parseInt(taskId)
  }

  const [tasks, setTasks] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedStartDate, setUpdatedStartDate] = useState(new Date());
  const [updatedDueDate, setUpdatedDueDate] = useState(new Date());
  const [updatedPriority, setUpdatedPriority] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedEstimate, setUpdatedEstimate] = useState(0);
  const [updatedTags, setUpdatedTags] = useState("");
  const [initialEstimate, setInitialEstimate] = useState(0);


  useEffect(() => {
    setTasks(loadTasks);
  }, [loadTasks]);

  useEffect(() => {
    if (tasks && taskId) setCurrentTask(tasks[taskId]);
  }, [tasks, taskId]);

  useEffect(() => {
    if (currentTask) {
      if (currentTask.name) setUpdatedName(currentTask.name);
      if (currentTask.priority) setUpdatedPriority(currentTask.priority);
      if (currentTask.location) setUpdatedLocation(currentTask.location);
      if (currentTask.tags) setUpdatedTags(currentTask.tags);
      if (currentTask.estimate) {
        setInitialEstimate(currentTask.estimate);
        setUpdatedEstimate(currentTask.estimate);
      }
      if (currentTask.startDate) setUpdatedStartDate(new Date(currentTask.startDate));
      if (currentTask.dueDate) setUpdatedDueDate(new Date(currentTask.dueDate));
    }
  }, [currentTask]);

  // useEffect(() => {
  //   console.log("updatedEstimate: ", updatedEstimate);
  //   console.log("type of updatedEstimate: ", typeof updatedEstimate);
  // }, [updatedEstimate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = updatedStartDate.toISOString().slice(0, 16);
    const formattedDueDate = updatedDueDate.toISOString().slice(0, 16);

    // const task = {
    //   ...currentTask,
    //   name: updatedName,
    //   start_date: formattedStartDate,
    //   due_date: formattedDueDate,
    //   priority: updatedPriority,
    //   location: updatedLocation,
    //   estimate: updatedEstimate,
    //   tags: updatedTags
    // };
    const task = {
       ...currentTask,
       start_date: formattedStartDate,
       due_date: formattedDueDate
      };

    if (updatedName) task.name = updatedName;
    if (updatedPriority) task.priority = updatedPriority;
    if (updatedLocation) task.location = updatedLocation;
    if (updatedEstimate) task.estimate = updatedEstimate;
    if (updatedTags) task.tags = updatedTags;


    await dispatch(taskActions.editTask(task));
  };

  return (
    <form className="task-edit" onSubmit={handleSubmit}>
        <div className="form-body">
            <div className="task-name">
              <label className="task-update-label">Name</label>
              <input className="task-update-name"
                  type='text'
                  value={updatedName}
                  placeholder='Task Name'
                  onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>

            <div className="task-fields">
                <div className="start">
                  <label className="task-update-label" htmlFor="task-start-date">Start</label>
                  <input type="datetime-local" className="task-update-dates"
                      name="task-start" value={updatedStartDate.toISOString().slice(0, 16)}
                      min="1970-06-07T00:00" max="2100-06-14T00:00"
                      onChange={(e) => setUpdatedStartDate(new Date(e.target.value))}
                  />
                </div>

                <div className="due">
                  <label className="task-update-label" htmlFor="task-due-date">Due</label>
                  <input type="datetime-local" className="task-update-dates"
                      name="task-due" value={updatedDueDate.toISOString().slice(0, 16)}
                      min="1970-06-07T00:00" max="2100-06-14T00:00"
                      onChange={(e) => setUpdatedDueDate(new Date(e.target.value))}
                  />
                </div>

                <div className="priority">
                  <label className="task-update-label">Priority</label>
                  <input className="task-update-prio"
                      type='text'
                      value={updatedPriority}
                      onChange={(e) => setUpdatedPriority(e.target.value)}
                  />
                </div>

                <div className="location">
                  <label className="task-update-label">Location</label>
                  <input className="task-update-input"
                      type='text'
                      value={updatedLocation}
                      onChange={(e) => setUpdatedLocation(e.target.value)}
                  />
                </div>

                <div className="estimate">
                  <label className="task-update-label" htmlFor="task-estimate">Estimate</label>
                  <select value={ updatedEstimate } onChange={(e) => setUpdatedEstimate(Number(e.target.value))} className="task-update-estimate">
                      <option disabled={true} value='' >(select one)</option>
                      <option value={initialEstimate}>{initialEstimate === 0 ? "no estimate" : initialEstimate + " min (no change)"}</option>
                      <option value={5}>5 minutes</option>
                      <option value={10}>10 minutes</option>
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={0}>no estimate</option>
                  </select>
                </div>

                <div className="tags">
                  <label className="task-update-label">Tags</label>
                  <input className="task-update-input"
                      type='text'
                      value={updatedTags}
                      onChange={(e) => setUpdatedTags(e.target.value)}
                  />
                </div>

                <button className="update-task-button" type="submit">Update Task</button>
            </div>

        </div>
    </form>
  );
}

export default TaskEdit;
