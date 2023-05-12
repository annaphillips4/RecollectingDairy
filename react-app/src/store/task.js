const LOAD_TASKS = "tasks/LOAD_TASKS"
const ADD_TASK = "tasks/ADD_TASK"
const UPDATE_TASK = "tasks/UPDATE_TASK"
const DELETE_TASK = "tasks/DELETE_TASK"

const load = (tasks) => ({
    type: LOAD_TASKS,
    tasks
});

const addTask = (task) => ({
    type: ADD_TASK,
    task
});

const updateTask = (task) => ({
    type: UPDATE_TASK,
    task
});

const removeTask = (taskId) => ({
    type: DELETE_TASK,
    taskId
});

export const loadTasks = () => async dispatch => {
    console.log("in loadTasks")
    let res = await fetch('/api/tasks')
    if (res.ok){
        res = await res.json()
        dispatch(load(res))
    }
};

export const postTask = (payload) => async dispatch => {
    console.log("in postTasks")
    const res = await fetch('/api/tasks/', {
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
};

export const editTask = (task) => async (dispatch) => {
    try {
        const taskId = task.id;
        const response = await fetch(`/api/lists/${taskId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            const error = await response.text();
            let errorJSON;
            try {
                // check to see if error is JSON
                errorJSON = JSON.parse(error);
            } catch {
                // error was not from server
                throw new Error(error);
            }
            throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
        }

        const changedTask = await response.json();
        dispatch(updateTask(changedTask));
        return changedTask;

    } catch (error) {
        throw error;
    }
};

export const deleteTask = (taskId) => async dispatch => {
    const response = await fetch(`api/tasks/${taskId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const deleteMessage = await response.json();
        dispatch(removeTask(taskId))
        return deleteMessage
    }
};

const initialState = {}
const tasksReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TASKS:
            return {...state, ...action.tasks};
        case ADD_TASK:
            return { ...state, [action.task.id]: action.task };
        case UPDATE_TASK:
            return { ...state, [action.task.id]: { ...action.task } };
        case DELETE_TASK:
            const stateMinusTask = { ...state };
            delete stateMinusTask[action.taskId];
            return stateMinusTask;
        default: return state;
    }
};

export default tasksReducer;
