const LOAD_TASKS = 'task/LOAD_TASKS'
const ADD_TASK = 'task/ADD_TASK'
const DELETE_TASK = 'task/DELETE_TASK'

const load = tasks => ({
    type: LOAD_TASKS,
    tasks
})

const addTask = task => ({
    type: ADD_TASK,
    task
})

const removeTask = task => ({
    type: DELETE_TASK,
    task
})

export const loadTasks = () => async dispatch => {
    console.log("in loadTasks")
    let res = await fetch('/api/tasks')
    if (res.ok){
        res = await res.json()
        dispatch(load(res))
    }
}

export const postTask = (payload) => async dispatch => {
    console.log("in postTasks")
    const res = await fetch('/api/new_task', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
    console.log(res)
    if (res.ok) {
        const task = await res.json();
        dispatch(addTask(task));
        return task;
    } else {
        throw res;
    }
}

export const deleteTask = (taskId) => async dispatch => {
    const res = await fetch(`api/tasks/${taskId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const task = await res.json();
        dispatch(removeTask(task))
        return task
    }
}

const initialState = {}
const tasksReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TASKS:
            return {...state, ...action.tasks}
        case ADD_TASK:
            return { ...state, [action.task.id]: action.task }
        case DELETE_TASK:
            const newState = { ...state }
            delete newState[action.task.id]
            return newState
        default: return state
    }
}

export default tasksReducer
