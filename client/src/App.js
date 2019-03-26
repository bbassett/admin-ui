import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Index from './index/Index'
import Browse from './browse/Browse'
import Login from './login/Login'

require('dotenv').config()

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/browse">Browse</Link></li>
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

export default App;