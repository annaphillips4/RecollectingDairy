const LOAD_LISTS = "lists/LOAD_LISTS"
const ADD_LIST = "lists/ADD_LIST"
const DELETE_LIST = "lists/DELETE_LIST"

const getLists = (lists) => ({
  type: LOAD_LISTS,
  lists
});

const addList = (list) => ({
  type: ADD_LIST,
  list
});

const removeList = (listId) => ({
  type: DELETE_LIST,
  listId
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

export const deleteList = (listId) => async (dispatch) => {
  try {
      const response = await fetch(`/api/lists/${listId}`, {
          method: 'delete',
          headers: {
              'Content-Type': 'application/json'
          }
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
      const deleteMessage = await response.json();
      dispatch(removeList(listId));
      return deleteMessage;
  } catch (error) {
      throw error;
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
      case DELETE_LIST:
        const stateMinusList = {...state};
        // const newIds = [];
        // state.allIds.forEach((id) => {
        //     if (id !== action.listId) newIds.push(id);
        // });

        delete stateMinusList[action.listId];

        // return {...stateMinusList, allIds: newIds};
        return {...stateMinusList};

    default:
      return state
  }
};

export default listsReducer
