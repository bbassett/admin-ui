import React, { Component } from 'react';
import styles from './Browse.module.css';
import Cookies from 'js-cookie';
import Form from '../components/form/Form';
import FormInput from '../components/form-input/FormInput';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class Browse extends Component {
  state = {jsonBody: '{}', access_token: Cookies.get('access_token'), open: true}
  async componentDidMount() {
    const url = get_api_url(window.location.pathname)

    let headers = {'Content-Type': 'application/json'}
    if(this.state.access_token) {
      headers['Authorization'] = `Bearer ${this.state.access_token}`
    }

    const api_response = await fetch(url, {headers: headers})
    const jsonBody = await api_response.json()
    this.setState({jsonBody: JSON.stringify(jsonBody)})
  }

  render() {
    return (
      <div>
        <List className={ styles.list }>
          { recursive_list(this.state, JSON.parse(this.state.jsonBody)) }
        </List>
      </div>
    );
  }
}

function get_api_url(path) {
  if (path === "/") {
    path = "/admin"
  }
  return `${process.env.REACT_APP_API_BASE_PATH}${path}`
}

function recursive_list(state, body) {
  const keys = Object.keys(body)

  return (
    keys.map((key, index) => {
      const value = body[key];
      if(key === "href") {
        return  <ListItem divider button onClick={ () => window.location = link(body[key]) }>
          <ListItemText inset primary={ link(body[key]) } />
        </ListItem>
      } else if(value === null) {
        return <ListItem divider>
          <ListItemText inset primary={ key } secondary="null"/>
        </ListItem>
      } else if (typeof(value) === "object") {
        if(value.method && value.method === "POST") {
          return (
            <Form action={value.action} subheader={ key }>
              {Object.keys(value.input).map((key, index) => {
                const input = value.input[key];
                console.log(input);
                return <FormInput
                  type={ input.type }
                  index={ input.index }
                  value={ input.value }
                  required={ input.required }
                  disabled={ input.disabled }
                  name={ key }
                >
                  { input.options }
                </FormInput>
              })}
            </Form>
          )
        } else {
          // it's a collection
          return (<Collapse in={state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { recursive_list(state, value) }
            </List>
          </Collapse>)
        }
      } else if (typeof(value) === "boolean") {
        return value ? "true" : "false"
      } else {
        return value
      }
    })
  )
}

function link(url) {
  if(url) {
    return new URL(url || '').pathname;
  } else {
    return ''
  }
}

function compute_input(key, input, index) {
  if(input.type === "select") {
    return compute_select(key, input, index)
  } else if(input.type === "checkbox") {
    return compute_checkbox(key, input, index)
  } else {
    return <input
      key={`form-input-${index}` }
      value={ input.value }
      type={ input.type }
      placeholder={ key }
      name={ key }
    />
  }
}

function compute_checkbox(key, input, index) {
  return (
    <div className={ styles.input }>
      <label htmlFor={ key }>{ key }</label>
      <input name={ key } type="checkbox" key={`form-input-${index}` } />
    </div>
  )
}

function compute_select(key, input, index) {
  return (
    <div className={ styles.input }>
      <label htmlFor={ key }>{ key }</label>
      <select name={ key } key={ `form-input-${index}` }></select>
    </div>
  )
}

export default Browse;