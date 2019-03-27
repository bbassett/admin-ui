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
            defaultValue="brandon@simplecast.com"
            required
          />
          <input
            name="password"
            required
            type="password"
            placeholder="password"
            defaultValue="BKbass0921!!"
            autoComplete="off"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;