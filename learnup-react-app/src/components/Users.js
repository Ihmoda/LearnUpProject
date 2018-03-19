import React, { Component } from 'react';
import { handleDeleteUser } from '../actions/users';
import { handlePromoteUser } from '../actions/users';
import { connect } from 'react-redux';

class Users extends Component {
  handleDeleteClicked = event => {
    const id = event.target.name;
    const { dispatch } = this.props;
    dispatch(handleDeleteUser(id));
  };

  handlePromoteClicked = event => {
    const id = event.target.name;
    const promotion = event.target.value === 'promote' ? true : false;
    const { dispatch } = this.props;
    dispatch(handlePromoteUser(id, promotion));
  };

  render() {
    const { users } = this.props;
    const admin = localStorage.getItem('admin');

    const lookupHash = {
      10: 'Super Admin',
      9: 'Admin',
      8: 'Teacher',
    };

    return (
      <div className="section">
        <table className="table table-striped table-hover align-middle col-md-12">
          <thead>
            <tr>
              <th>Email</th>
              <th>Admin Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td scope="row actionsrow">{user.email}</td>
                <td>{lookupHash[user.admin]}</td>
                <td>
                  <div className="row">
                    <div className="col-md-4 action">
                      <button
                        type="button"
                        name={user.id}
                        className="btn btn-danger actions deleteuser"
                        onClick={this.handleDeleteClicked}
                      >
                        Delete User
                      </button>
                    </div>
                    <div className="col-md-4 action">
                      <div>
                        <button
                          type="button"
                          name={user.id}
                          className="btn btn-success actions"
                          value="promote"
                          onClick={this.handlePromoteClicked}
                        >
                          Promote User
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4 action">
                      <div>
                        <button
                          type="button"
                          name={user.id}
                          value="demote"
                          className="btn btn-primary actions"
                          onClick={this.handlePromoteClicked}
                        >
                          Demote User
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect()(Users);
