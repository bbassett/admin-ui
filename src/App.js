import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import QueryString from 'query-string';
import styles from './App.module.css';
import Browse from './browse/Browse';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

require('dotenv').config()

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
    const logout_url = `${process.env.REACT_APP_AUTH_SERVER_URL}/logout`;

    return (
      <Router>
        <div>
          <div className={ styles.root }>
            <AppBar position="static">
              <Toolbar>
                <Typography key='type1' variant="h6" color="inherit" className={ styles.grow }>
                  Simplecast Admin
                </Typography>
                <Typography color="inherit" key='type2'>
                  <Button key='search'><a href="/admin" className={ styles.link }>Search</a></Button>
                  <Button key='logout'><a href={ logout_url } className={ styles.link } onClick={ this.logout }>Logout</a></Button>
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <Route path="/" render={() => (
            redirect_to ? (
              <Redirect to={ redirect_to} />
            ) : (
              <Browse />
            )
          )} />
        </div>
     </Router>
    );
  }
}

export default withCookies(App);