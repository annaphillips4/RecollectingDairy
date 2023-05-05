const LOAD_LISTS = 'lists/LOAD_LISTS'

const getLists = lists => ({
  type: LOAD_LISTS,
  lists
});

export const loadLists = () => async (dispatch) => {
  let res = await fetch('/api/lists')

  if (res.ok) {
    res = await res.json()
    dispatch(getLists(res))
  }
};

const initialState = {}

const lists = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LISTS:
      return { ...state, ...action.lists }
    default:
      return state
  }
};

export default lists
