import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import QueryString from 'query-string';
import styles from './App.module.css';
import Index from './index/Index';
import Browse from './browse/Browse';
import Login from './login/Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
      <Typography color="inherit" key='type2'>
        <Button key='browse'><Link to="/browse" className={ styles.link }>Browse</Link></Button>
        <Button key='logout'><a href="/" className={ styles.link } onClick={ this.logout }>Logout</a></Button>
      </Typography>
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
    const redirect_to = QueryString.parse(window.location.search).path;

    return (
      <Router>
        <div>
          <div className={ styles.root }>
            <AppBar position="static">
              <Toolbar>
                <Typography key='type1' variant="h6" color="inherit" className={ styles.grow }>
                  Simplecast Admin
                </Typography>
                { this.state.loggedIn ? <LoggedIn /> : <LoggedOut /> }
              </Toolbar>
            </AppBar>
          </div>
          <nav>
            <ul>
              { this.state.loggedIn ? <LoggedIn /> : <LoggedOut /> }
            </ul>
          </nav>
          <Route path="/" exact render={() => (
            redirect_to ? (
              <Redirect to={ redirect_to} />
            ) : (
              <Index />
            )
          )} />
          <Route path="/browse/" component={Browse} />
          <Route path="/login/" exact component={Login} />
        </div>
      </Router>
    );
  }
}

export default withCookies(App);