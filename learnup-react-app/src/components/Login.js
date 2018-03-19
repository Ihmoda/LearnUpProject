import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/authedUser';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    if ('user' in localStorage) {
      history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;

    if ('user' in localStorage) {
      history.push('/dashboard');
    }
  }

  updateFormData = event => {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(handleLogin(this.state));
  };

  isFormComplete = () => {
    const { email, password } = this.state;
    return email === '' || password === '';
  };

  render() {
    const { authedUser } = this.props;
    return (
      <div>
        <div className="header">
          <h1>LearnUp Digital Reading Board Login</h1>
        </div>
        {authedUser.email === 'error' ? (
          <p className="error">***Incorrect username or password, please try again.</p>
        ) : null}
        <div className="row userlogin">
          <div className="col-md-4" />
          <form className="col-md-4" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                onChange={this.updateFormData}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter your password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                onChange={this.updateFormData}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" disabled={this.isFormComplete()}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapToState({ authedUser }) {
  return {
    authedUser: authedUser,
  };
}

export default connect(mapToState)(Login);
