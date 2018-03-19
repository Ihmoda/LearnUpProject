import { _getUsers, _addUser, _editUser, _deleteUser, _promoteUser } from '../utils/api';
import { updateMessage } from './message';
import { formatUsers } from '../utils/helpers';

export const GOT_USERS = 'GOT_USERS';
export const ADD_USER = 'ADD_USER';

// helper function to remove user
function removeUser(removeID, users) {
  const userArray = Object.keys(users)
    .filter(userid => userid != removeID)
    .map((filteredID) => {
      const { email, id, admin } = users[filteredID];
      return {
        email,
        id,
        admin,
      };
    });
  return formatUsers(userArray);
}

// helper function to promote/demote a user
function changeAdminLevel({ email, id, admin }, promote) {
  const newAdmin = promote ? (admin += 1) : (admin -= 1);
  return {
    email,
    id,
    admin: newAdmin,
  };
}

export function gotUsers(users) {
  return {
    type: GOT_USERS,
    users,
  };
}

export function addUser({ email, admin, id }) {
  return {
    type: ADD_USER,
    email,
    admin,
    id,
  };
}

export function handleGetUsers() {
  return (dispatch) => {
    _getUsers()
      .then((users) => {
        dispatch(gotUsers(users));
      })
      .catch(() => {});
  };
}

export function handleAddUser(user) {
  return (dispatch) => {
    _addUser(user)
      .then((newUser) => {
        dispatch(addUser(newUser));
        dispatch(updateMessage({ message: `Successfully added ${newUser.email}` }));
      })
      .catch(() => {
        dispatch(updateMessage({
          message: 'Could not add user. Does this user already exist?',
        }));
      });
  };
}

export function handleEditUser(user) {
  return (dispatch) => {
    _editUser(user)
      .then((editedUser) => {
        dispatch(addUser(editedUser));
        dispatch(updateMessage({ message: `Successfully edited ${editedUser.email}` }));
      })
      .catch(() => {
        dispatch(updateMessage({
          message:
              'Could not edit user. The user either does not exist in database, or your account lacks necessary permissions.',
        }));
      });
  };
}

export function handleDeleteUser(id) {
  return (dispatch, getState) => {
    const { users } = getState();
    // remove users from state (optimistic update)
    const newUsers = removeUser(id, users);
    dispatch(gotUsers(newUsers));
    _deleteUser(id)
      .then((data) => {
        dispatch(updateMessage({ message: data.message }));
      })
      .catch(() => {
        dispatch(addUser(users[id]));
        dispatch(updateMessage({
          message: `Could not delete ${users[id].email}. Do you have adequate permissions?`,
        }));
      });
  };
}

export function handlePromoteUser(id, promotion) {
  return (dispatch, getState) => {
    const { users } = getState();
    // optimistically promote user
    const promotedUser = changeAdminLevel(users[id], promotion);
    dispatch(addUser(promotedUser));
    _promoteUser(id, promotion)
      .then((data) => {
        dispatch(updateMessage({ message: data.message }));
      })
      .catch(() => {
        const resetUser = changeAdminLevel(promotedUser, !promotion);
        dispatch(addUser(resetUser));
        dispatch(updateMessage({
          message: `Could not change admin level for ${
            resetUser.email
          }. Do you have adequate permissions?`,
        }));
      });
  };
}
