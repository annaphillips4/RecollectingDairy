const LOAD_TASKS = 'task/LOAD_TASKS'

const load = tasks => ({
    type: LOAD_TASKS,
    tasks
})

export const loadTasks = () => async dispatch => {
    let res = await fetch('/api/tasks')
    if (res.ok){
        res = await res.json()
        dispatch(load(res))
    }
}

const initialState = {}
const tasks = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TASKS:
            return {...state, ...action.reviews}
        default: return state
    }
}

export default tasks
