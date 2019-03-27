import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import './App.css';
import Index from './index/Index';
import Browse from './browse/Browse';
import Login from './login/Login';

require('dotenv').config()

function LoggedOut() {
  return (
    <li><Link to="/login">Login</Link></li>
  )
}

class LoggedIn extends Component {
  logout = function(e){
    console.log('submitting');

    fetch('/logout', {
      method: 'POST',
      data: {}
    });
  }

  render() {
    return [
      <li key='browse'><Link to="/browse">Browse</Link></li>,
      <li key='logout'><a href="/" onClick={ this.logout }>Logout</a></li>
    ]
  }
}

class App extends Component {
  state = {
    accessToken: null,
    loggedIn: false
  }
  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.cookies.cookies.access_token,
      loggedIn: this.props.cookies.cookies.access_token ? true : false
    }
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              { this.state.loggedIn ? <LoggedIn /> : <LoggedOut /> }
            </ul>
          </nav>
          <Route path="/" exact component={Index} />
          <Route path="/browse/" component={Browse} />
          <Route path="/login/" exact component={Login} />
        </div>
      </Router>
    );
  }
}

export default withCookies(App);