import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddUser } from '../actions/users';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      admin: 'Teacher',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(handleAddUser(this.state));
  };

  handleValueChange = event => {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  isDisabled = () => {
    return this.state.email === '';
  };

  render() {
    return (
      <div>
        <form className="col-md-5 admin-tools" onSubmit={this.handleSubmit}>
          <h5>Register New User</h5>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter email"
              onChange={this.handleValueChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin">Admin Level</label>
            <select className="form-control" name="admin" onChange={this.handleValueChange}>
              <option>Teacher</option>
              <option>Admin</option>
            </select>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary pull-right"
              disabled={this.isDisabled()}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Add);
