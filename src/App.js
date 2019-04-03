import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import styles from './App.module.css';
import Browse from './browse/Browse';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
    const logout_url = `${process.env.REACT_APP_AUTH_SERVER_URL}/logout`;

    return (
      <div>
        <div className={ styles.root }>
          <AppBar position="static">
            <Toolbar>
              <span className={ styles.grow }>
                Simplecast Admin
              </span>
              <Button key='search'><a href="/admin" className={ styles.link }>Search</a></Button>
              <Button key='logout'><a href={ logout_url } className={ styles.link } onClick={ this.logout }>Logout</a></Button>
            </Toolbar>
          </AppBar>
        </div>
        <Browse />
      </div>
    );
  }
}

export default withCookies(App);