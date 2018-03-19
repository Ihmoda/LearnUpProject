import React, { Component } from 'react';
import { handleGetUsers } from '../actions/users';
import { connect } from 'react-redux';
import Header from './Header';
import GenerateRoom from './GenerateRoom';
import Users from './Users';
import Add from './Add';
import Edit from './Edit';

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { history } = this.props;
    if (!('user' in localStorage)) {
      history.push('/');
    }

    dispatch(handleGetUsers());
  }

  render() {
    const { history, users, message } = this.props;
    const showMessage = message ? message.message : null;

    return (
      <div className="container">
        <Header history={history} />
        <GenerateRoom history={history} />
        <h5 className="dash-message">{showMessage}</h5>
        <h2 className="dash-headers">User Settings</h2>
        <Users users={users} message={showMessage} />
        <h2 className="dash-headers">Add / Edit Users</h2>
        <Add message={showMessage} />
        <Edit message={showMessage} />
      </div>
    );
  }
}

function mapPropsToState({ users, message }) {
  const myUsers = Object.keys(users)
    .map(id => users[id])
    .sort((a, b) => b.admin - a.admin);
  return {
    users: myUsers,
    message: message.message,
  };
}

export default connect(mapPropsToState)(Dashboard);
