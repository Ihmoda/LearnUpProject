import axios from 'axios';
import { formatUsers } from './helpers';

export function _login(user) {
  return axios
    .post('/login', user)
    .then(user => ({ email: user.data.email, admin: user.data.admin, id: user.data.id }));
}

export function _getUsers() {
  return axios.get('/users').then((users) => {
    if (!users.data.error) {
      return formatUsers(users.data);
    }
    return null;
  });
}

export function _addUser(user) {
  return axios.post('/users/new', user).then((user) => {
    if (!user.data.error) {
      return user.data;
    }
    return null;
  });
}

export function _editUser(user) {
  return axios.post('/users/edit', user).then((user) => {
    if (!user.data.error) {
      return user.data;
    }
    return null;
  });
}

export function _deleteUser(id) {
  return axios.post(`/users/delete/${id}`).then((data) => {
    if (!data.data.error) {
      return data.data;
    }
    return null;
  });
}

export function _promoteUser(id, promote) {
  const promotion = promote ? 'promote' : 'demote';
  return axios.post(`/users/${promotion}/${id}`).then((data) => {
    if (!data.data.error) {
      return data.data;
    }
    return null;
  });
}
