import { GOT_USERS, ADD_USER } from '../actions/users';

// users reducer
export default function users(state = {}, action) {
  switch (action.type) {
    case GOT_USERS:
      return {
        ...action.users,
      };
    case ADD_USER:
      return {
        ...state,
        [action.id]: {
          ...action,
        },
      };
    default:
      return state;
  }
}
