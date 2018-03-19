import { UPDATE_MESSAGE } from '../actions/message';

// message reducer
export default function message(state = {}, action) {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return {
        message: action.message,
      };
    default:
      return state;
  }
}
