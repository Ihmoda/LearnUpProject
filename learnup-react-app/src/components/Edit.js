import React, { Component } from 'react';
import { handleEditUser } from '../actions/users';
import { connect } from 'react-redux';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPW: '',
      email: '',
      admin: 'Teacher',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validationChecker()) {
      const { dispatch } = this.props;
      dispatch(handleEditUser(this.state));
    }
  };

  validationChecker = event => {
    //ADDD FRONT END VALIDATIONS HERE (REGEX, ETC)
    return true;
  };

  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    return (
      <div>
        <form className="col-md-5 admin-tools" onSubmit={this.handleSubmit}>
          <h5>Edit Existing User</h5>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter user email"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin">Admin Level</label>
            <select className="form-control" name="admin" onChange={this.handleOnChange}>
              <option>Teacher</option>
              <option>Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter new password"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPW">Confirm PW</label>
            <input
              type="password"
              className="form-control"
              name="confirmPW"
              placeholder="Confirm new password"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary pull-right">
              Edit User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Edit);
