import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from 'react-router-dom';

const TaskEdit = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const taskId = Number(useParams().taskId);

    const [errors, setErrors] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [lists, setLists] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentList, setCurrentList] = useState(null);
    const [start, setStart] = useState(null);
    const [due, setDue] = useState(null);
    const [repeats, setRepeats] = useState(null);
    const [tags, setTags] = useState(null);
    const [listName, setListName] = useState(null);


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
            setStart(currentTask.startDate);
            setDue(currentTask.dueDate);
            setTags(currentTask.tags);
        }
    }, [currentTask]);


};

export default TaskEdit
