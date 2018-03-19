import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Board from './Board';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/board/:id" component={Board} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
