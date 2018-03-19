import { _login } from '../utils/api';

export const LOG_USER = 'LOG_USER';
export const LOGIN_ERROR = 'LOGIN ERROR';

export function setAuthedUser({ email, admin }) {
  return {
    type: LOG_USER,
    email,
    admin,
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR,
  };
}

export function handleLogin(user) {
  return (dispatch) => {
    _login(user).then((loggedUser) => {
      if (loggedUser.email) {
        localStorage.setItem('user', loggedUser.email);
        localStorage.setItem('admin', loggedUser.admin);
        localStorage.setItem('id', loggedUser.id);
        dispatch(setAuthedUser(loggedUser));
      } else {
        dispatch(loginError());
      }
    });
  };
}
