import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiHandler from '../middleware/apiHandler';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  apiHandler,
  thunkMiddleware
)(createStore);

/**
 * Brief description. Long description.
 * @param initalState
 * @return Store with
 * @exception
 * @see
 * @author
 */
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
