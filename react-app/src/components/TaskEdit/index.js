import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const TaskEdit = () => {
    const dispatch = useDispatch();

    const taskId = Number(useParams().taskId);

    const [errors, setErrors] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [lists, setLists] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentList, setCurrentList] = useState(null);
    const [name, setName] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    // const [repeats, setRepeats] = useState(null);
    // const [repeatPeriod, setRepeatPeriod] = useState(null);
    // const [repeatType, setRepeatType] = useState(null);
    const [tags, setTags] = useState(null);
    const [estimate, setEstimate] = useEffect(null);
    const [location, setLocation] = useEffect(null);
    const [listName, setListName] = useState(null);
    const [submissionAttempt, setSubmissionAttempt] = useState(false);


    const loadTasks = useSelector((state) => state.tasks);
    const loadLists = useSelector((state) => state.lists);
    const loadUser = useSelector((state) => state.session.user);

    useEffect(() => {
        setTasks(loadTasks);
        setLists(loadLists);
        setCurrentUser(loadUser);
    }, [loadTasks, loadLists, loadUser]);

    useEffect(() => {
        if (tasks) setCurrentTask(tasks[taskId]);
    }, [tasks, taskId]);

    useEffect(() => {
        if (lists && currentTask && currentTask.listId) setCurrentList(lists[currentTask.listId]);
    }, [lists, currentTask]);

    useEffect(() => {
        if (currentList) setListName(currentList.name);
    }, [currentList]);

    useEffect(() => {
        if (currentTask) {
            setName(currentTask.name);
            setStartDate(currentTask.startDate);
            setDueDate(currentTask.dueDate);
            // setTags(currentTask.tags);
            setEstimate(currentTask.estimate);
            setLocation(currentTask.location);
        }
    }, [currentTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionAttempt(true);
        if (errors.length) return;

        const task = { ...currentTask, name,
            start_date: startDate, due_date: dueDate,
            estimate, location, list_id: currentList.id };

        setSubmissionAttempt(false);
    };

    return (
        <form className="task-edit" onSubmit={handleSubmit}>
            <div className="form-body">
                <div className="task-name">
                    <input
                        type='text'
                        value={name}
                        placeholder='Task Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="task-fields">
                    <div className="start">
                        <label htmlFor="task-start-date">start</label>
                            <input type="datetime-local" id="task-start-date"
                                name="task-start" value={startDate}
                                min="1970-06-07T00:00" max="2100-06-14T00:00"
                                onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="due">
                        <label htmlFor="task-due-date">due</label>
                            <input type="datetime-local" id="task-due-date"
                                name="task-due" value={dueDate}
                                min="1970-06-07T00:00" max="2100-06-14T00:00"
                                onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div className="estimate">
                        <label htmlFor="task-estimate">estimate</label>
                            <select value={estimate === 0 ? "none" : estimate + " minutes"} onChange={(e) => setEstimate(e.target.value)}>
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
                    <div className="location">
                        <input
                            type='text'
                            value={location}
                            placeholder='Task Location'
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="tags">
                        <input
                            type='text'
                            value={tags}
                            placeholder='Task Tags'
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>

            </div>
        </form>
    );

};

export default TaskEdit
