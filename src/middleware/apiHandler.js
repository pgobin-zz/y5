import { call } from './api';

export const CALL_API = Symbol('Call API');

/**
 * Merge data and action into new object.
 *
 * @param action Redux action
 * @param data Action payload
 * @return Object
 */
const actionWith = (action, data) => {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[CALL_API];
  return finalAction;
};

/**
 * Redux middleware that interprets an action with CALL_API info
 * specified. Executes the call when an action is dispatched.
 *
 * @param store Redux store
 * @param next Callback to execute
 * @param action Redux action
 * @return Observable
 */
export default store => next => action => {
  const callApi = action[CALL_API];
  if (typeof callApi === 'undefined') return next(action);

  // Get properties from action and get types 
  const { nextToken, reqs, types } = callApi;
  const [successType, failureType] = types;

  // call(...) API with array of observables
  // Execute callback with action payload on success or failure
  return call(reqs)
    .subscribe(
      res => {
        const data = { res, nextToken: nextToken, type: successType };
        next(actionWith(action, data));
      },
      err => {
        const data = { type: failureType, error: err.message };
        next(actionWith(action, data));
      }
    );
};
