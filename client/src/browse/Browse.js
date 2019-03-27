import React, { Component } from 'react';
import './Browse.css';
import Cookies from 'js-cookie';

class Browse extends Component {
  state = {jsonBody: '{}', access_token: Cookies.get('access_token')}
  async componentDidMount() {
    console.log(this.state.access_token);

    const url = get_api_url(window.location.pathname)

    let headers = {'Content-Type': 'application/json'}
    if(this.state.access_token) {
      headers['Authorization'] = `Bearer ${this.state.access_token}`
    }

    const api_response = await fetch(url, {headers: headers})
    const jsonBody = await api_response.json()
    this.setState({jsonBody: JSON.stringify(jsonBody)})

    console.log(jsonBody)
  }

  render() {
    return (
      <div>
        { recursive_list(JSON.parse(this.state.jsonBody)) }
      </div>
    );
  }
}

function get_api_url(path) {
  path = path == '/browse'
    ? '/admin'
    : path.replace('/browse', '');

  return `${process.env.REACT_APP_API_URL}${path}`
}

function recursive_list(body) {
  const keys = Object.keys(body)

  return (
    <ul>
    {
      keys.map(key => {
        return key === "href"
        ? <li key={ key }>{ link_to(body[key]) }</li>
        : <li key={ key }>{ key }: { get_val(body[key]) }</li>
      })
    }
    </ul>
 )
}

function link_to(url) {
  const path = new URL(url).pathname;
  return <a href={ `/browse${path}` }>{ path }</a>
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

export default Browse;