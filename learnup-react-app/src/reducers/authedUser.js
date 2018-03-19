import { LOG_USER } from '../actions/authedUser';
import { LOGIN_ERROR } from '../actions/authedUser';

// authed user reducer
export default function authedUser(state = {}, action) {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log('login error');
      return {
        ...state,
        email: 'error',
        admin: 'error',
      };
    case LOG_USER:
      return {
        ...state,
        email: action.email,
        admin: action.admin,
      };
    default:
      return state;
  }
}
