import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <h1> login </h1>
        <form method="POST" action="/login">
          <input
            name="email"
            placeholder="email"
            required
          />
          <input
            name="password"
            required
            type="password"
            placeholder="password"
            autoComplete="off"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;