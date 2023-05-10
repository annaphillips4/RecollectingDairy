const LOAD_LISTS = "lists/LOAD_LISTS"
const ADD_LIST = "lists/ADD_LIST"

const getLists = lists => ({
  type: LOAD_LISTS,
  lists
});

const addList = (list) => ({
  type: ADD_LIST,
  list
});

export const loadLists = () => async (dispatch) => {
  let res = await fetch("/api/lists")

  if (res.ok) {
    res = await res.json()
    dispatch(getLists(res))
  }
};

export const newList = (list) => async (dispatch) => {
  const res = await fetch("/api/lists", {
    method: "POST",
    body: JSON.stringify(list)
  });

  if (res.ok) {
    const data = res.json();

    dispatch(addList(data));
  }
};

const initialState = {}

const lists = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOAD_LISTS:
      return { ...state, ...action.lists }
    case ADD_LIST:
      newState = {...state, ...action.list}
      return newState;
    default:
      return state
  }
};

export default lists
