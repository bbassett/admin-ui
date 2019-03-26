import React, { Component } from 'react';
import './App.css';
import Cookies from 'js-cookie';
require('dotenv').config()

class App extends Component {
  state = {resp: '{}', access_token: Cookies.get('access_token')}
  async componentDidMount() {
    console.log(this.state.access_token);
    const url = `${process.env.REACT_APP_API_URL}${window.location.pathname}`
    let headers = {}
    if(this.state.access_token) {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.access_token}`
      }
    } else {
      headers = {
        'Content-Type': 'application/json',
      }
    }
    const response = await fetch(url, {headers: headers})
    const resp   = await response.json()
    this.setState({resp: JSON.stringify(resp)})
  }

  render() {
    return (
      <div>
        <h2>{process.env.REACT_APP_API_URL}</h2>
        { recursive_list(JSON.parse(this.state.resp)) }
      </div>
    );
  }
}

function recursive_list(body) {
  const keys = Object.keys(body)

  return (
    <ul>
    {
      keys.map(key => {
        return key == "href"
        ? <li>{ link_to(body[key]) }</li>
        : <li>{ key }: { get_val(body[key]) }</li>
      })
    }
    </ul>
 )
}

function link_to(url) {
  const path = new URL(url).pathname;
  return <a href={ path }>{ path }</a>
}

function get_val(value) {
  if (value == null) {
    return "null"
  } else if (typeof(value) === "object") {
    if(value.method && value.method === "POST") {
      return "form"
    } else {
      return recursive_list(value)
    }
  } else if (typeof(value) === "boolean") {
    if (value) {
      return "true"
    } else {
      return "false"
    }
  } else {
    console.log(typeof(value))
    return value
  }
}

export default App;