import { CALL_API } from '../middleware/apiHandler';
import { call } from '../middleware/api';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const FETCH_FAILURE = 'FETCH_FAILURE';

/**
 * Fetch user data.
 * 
 * @param ids Array of ids to fetch
 * @param nextToken Continuation token
 * @return undefined
 */
const fetchUsers = (ids, nextToken) => ({
  [CALL_API]: {
    nextToken: nextToken,
    reqs: ids.map(id => `detail/${id}`),
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE]
  }
});

/**
 * Dispatch call to fetch users.
 * 
 * @param nextToken Continuation token
 * @param dispatch Redux dispatch(...) fn
 * @return undefined
 */
export const loadUsers = nextToken => dispatch => {
  const queryString = nextToken ? `?token=${nextToken}` : '';
  call(`list${queryString}`).subscribe(
    res => dispatch(fetchUsers(res[0].result, res[0].token)),
    err => dispatch({ type: FETCH_FAILURE, error: err.message })
  );
};
