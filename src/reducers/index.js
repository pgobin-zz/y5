import { combineReducers } from 'redux';

/**
 * Reducer for 'entities' state object.
 * 
 * @param state Redux state
 * @param action Redux action
 * @return New state object or current state if no change
 */
const entities = (state = { users: [], nextToken: null }, action) => {
  if (action.res) {
    const nextToken = action.nextToken;

    // Concatenate users and remove those with no IDs
    const users = [...state.users, ...action.res]
      .filter(x => x.id);

    // Create new object by shallow merging with state
    return Object.assign({}, state, {
      nextToken: nextToken,
      users: users
    });
  }

  return state;
};

/**
 * Reducer for 'errorMessage' state object.
 * 
 * @param state Redux state
 * @param action Redux action
 * @return If error message, returns new error message, otherwise
 * returns current state.
 */
function errorMessage(state = null, action) {
  const { error } = action;
  if (error) return action.error;
  return state;
}

const rootReducer = combineReducers({
  entities,
  errorMessage
});

export default rootReducer;
