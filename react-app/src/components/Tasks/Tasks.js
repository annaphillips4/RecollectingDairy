import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "../../store/task";

export default function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const tasksArr = Object.values(tasks)

    useEffect(() => {
        dispatch(loadTasks())
    }, [dispatch])
    return (
        <div>Tasks Here!!!</div>
    )
}

// Pick up 38:00
