import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

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

  console.log(currentTask)

  return (
    <form className="task-edit" >
        <div className="form-body">
            <div className="task-name">
              <label>Name</label>
              <input
                  type='text'
                  value={updatedName}
                  placeholder='Task Name'
                  onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>

            <div className="task-fields">
                <div className="start">
                  <label htmlFor="task-start-date">Start</label>
                  <input type="datetime-local" id="task-start-date"
                      name="task-start" value={updatedStartDate}
                      min="1970-06-07T00:00" max="2100-06-14T00:00"
                      onChange={(e) => setUpdatedStartDate(e.target.value)}
                  />
                </div>

                <div className="due">
                  <label htmlFor="task-due-date">Due</label>
                  <input type="datetime-local" id="task-due-date"
                      name="task-due" value={updatedDueDate}
                      min="1970-06-07T00:00" max="2100-06-14T00:00"
                      onChange={(e) => setUpdatedDueDate(e.target.value)}
                  />
                </div>

                <div className="priority">
                  <label>Priority</label>
                  <input
                      type='text'
                      value={updatedPriority}
                      onChange={(e) => setUpdatedPriority(e.target.value)}
                  />
                </div>

                <div className="location">
                  <label>Location</label>
                  <input
                      type='text'
                      value={updatedLocation}
                      onChange={(e) => setUpdatedLocation(e.target.value)}
                  />
                </div>

                <div className="estimate">
                  <label htmlFor="task-estimate">Estimate</label>
                  <select value={updatedEstimate === 0 ? "none" : updatedEstimate + " minutes"} onChange={(e) => setUpdatedEstimate(e.target.value)}>
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
                  <label>Tags</label>
                  <input
                      type='text'
                      value={updatedTags}
                      onChange={(e) => setUpdatedTags(e.target.value)}
                  />
                </div>
            </div>

        </div>
    </form>
  );
}

export default TaskEdit;
