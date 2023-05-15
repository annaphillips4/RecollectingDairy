import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as taskActions from "../../store/task";
import "./TaskEdit.css";

const TaskEdit = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);

  let { taskId } = useParams()
  if (taskId) {
    taskId = parseInt(taskId)
  }

  const [currentTask, setCurrentTask] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedStartDate, setUpdatedStartDate] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedEstimate, setUpdatedEstimate] = useState("");
  const [updatedTags, setUpdatedTags] = useState("");

  useEffect(() => {
    if (tasks) setCurrentTask(tasks[taskId]);
  }, [tasks, taskId]);

  useEffect(() => {
    if (currentTask) {
      setUpdatedName(currentTask.name)
      setUpdatedStartDate(currentTask.startDate)
      setUpdatedDueDate(currentTask.dueDate)
      setUpdatedPriority(currentTask.priority)
      setUpdatedLocation(currentTask.location)
      setUpdatedEstimate(currentTask.estimate)
      setUpdatedTags(currentTask.tags)
    }
  }, [currentTask])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      id: taskId,
      name: updatedName,
      startDate: updatedStartDate,
      dueDate: updatedDueDate,
      priority: updatedPriority,
      location: updatedLocation,
      estimate: updatedEstimate,
      tags: updatedTags
    };

    return await dispatch(taskActions.editTask(task));
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
                      name="task-start" value={updatedStartDate}
                      min="1970-06-07T00:00" max="2100-06-14T00:00"
                      onChange={(e) => setUpdatedStartDate(e.target.value)}
                  />
                </div>

                <div className="due">
                  <label className="task-update-label" htmlFor="task-due-date">Due</label>
                  <input type="datetime-local" className="task-update-dates"
                      name="task-due" value={updatedDueDate}
                      min="1970-06-07T00:00" max="2100-06-14T00:00"
                      onChange={(e) => setUpdatedDueDate(e.target.value)}
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
                  <select value={updatedEstimate === 0 ? "none" : updatedEstimate + " minutes"} onChange={(e) => setUpdatedEstimate(e.target.value)} className="task-update-estimate">
                      <option disabled={true} value='' >(select one)</option>
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
