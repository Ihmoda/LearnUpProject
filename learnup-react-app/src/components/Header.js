import React, { Component } from 'react';

class Header extends Component {
  handleLogoutClick = event => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  render() {
    const email = localStorage.getItem('user');
    return (
      <div>
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4" />
          <div className="col-md-4">
            <p> Logged in as {email}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <h3>Welcome to the LearnUp Dashboard!</h3>
          </div>
          <button
            type="button"
            name="logout"
            onClick={this.handleLogoutClick}
            className="btn btn-primary"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
