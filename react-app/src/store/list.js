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
  const res = await fetch("/api/lists", {
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (res.ok) {
    const data = await res.json()
    dispatch(getLists(data))
    return data;
  }
};

export const newList = (list) => async (dispatch) => {
  const res = await fetch("/api/lists/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addList(data));
    return data;
  }
};

const initialState = {}

const listsReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOAD_LISTS:
      return { ...state, ...action.lists }
    case ADD_LIST:
      newState = { ...state, [action.list.id]: action.list }
      return newState;
    default:
      return state
  }
};

export default listsReducer
