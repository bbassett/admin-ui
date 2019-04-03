import React, { Component } from 'react';
import styles from './Browse.module.css';
import Cookies from 'js-cookie';
import List from '@material-ui/core/List';
import Json from '../components/json/Json';
import Link from '../components/link/Link';
import Text from '../components/text/Text';
import Form from '../components/form/Form';
import Collection from '../components/collection/Collection';
import ApiObject from '../components/object/Object';
import InputCheckbox from '../components/input/checkbox/Checkbox';
import InputText from '../components/input/text/Text';

class Browse extends Component {
  state = {jsonBody: '{}', access_token: Cookies.get('access_token'), open: true}
  async componentDidMount() {
    const pathname = window.location.pathname
    const api_url = process.env.REACT_APP_API_BASE_PATH
    const url = pathname === "/" ? `${api_url}/admin` : `${api_url}${pathname}`

    const headers = {'Content-Type': 'application/json'}
    if(this.state.access_token) {
      headers['Authorization'] = `Bearer ${this.state.access_token}`
    }

    const api_response = await fetch(url, {headers: headers})
    const jsonBody = await api_response.json()
    this.setState({jsonBody: JSON.stringify(jsonBody, null, 4)})
  }

  render() {
    return (
      <div className={ styles.root }>
        <List className={ styles.list }>
          <Json>{ this.state.jsonBody }</Json>
          { to_items(JSON.parse(this.state.jsonBody), null, "root") }
        </List>
      </div>
    );
  }
}

function to_items(body, parentKey, namespace) {
  const keys = Object.keys(body)

  return (
    keys
    .sort()
    .map((key, index) => {
      const value = body[key];
      if (key === "href") {
        return <Link key={ `${namespace}-${index}` } href={ value } />
      } else if(value === null || typeof(value) === "boolean" || typeof(value) === "string") {
        return <Text key={ `${namespace}-${index}` } fieldKey={ human_readable(key) } value={ value } />
      } else if(Array.isArray(value)) {
        return <Collection reactKey={ `${namespace}-${index}` } key={ `${namespace}-${index}` } fieldKey={ human_readable(key) }>
          { to_items(value, key, `${namespace}-${index}`) }
        </Collection>
      } else if (typeof(value) === "object") {
        if(value.method && (value.method === "POST" || value.method === "DELETE")) {
          return (
            <Form
              key={ `${namespace}-${index}` }
              reactKey={ `${namespace}-${index}` }
              action={value.action}
              header={ human_readable(parentKey) }
              subHeader={ human_readable(key) }
            >
              { to_inputs(key, value.input, `${namespace}-${index}`) }
            </Form>
          )
        } else {
          // it's an object, but not a form
          return <ApiObject key={ `${namespace}-${index}` } fieldKey={ human_readable(key) }>
            { to_items(value, key, `${namespace}-${index}`)}
          </ApiObject>
        }
      } else {
        return <div key={ `${namespace}-${index}` }></div>
      }
    })
  )
}

function human_readable(key) {
  if(key) {
    return (<span key={ `${key}-str` } className={ styles.caps }>{ key.replace(/_/g, " ") }</span>);
  } else {
    return (<span></span>);
  }
}

function to_inputs(key, inputs, reactKey) {
  const input_keys = Object.keys(inputs);

  return input_keys.map((key, index) => {
    const value = inputs[key];
    value["name"] = key;
    value["label"] = human_readable(key);
    value["key"] = `${reactKey}-${index}`;
    value["required"] = value["required"] === "true" ? true : false;
    if (value.type === "checkbox") {
      return <InputCheckbox { ...value } />;
    } else if(!value.type) {
      return <InputText { ...value } />;
    } else if(value.type === "password") {
      return <InputText { ...value } />;
    } else if(value.type === "hidden") {
      value["disabled"] = true;
      value["type"] = "text";
      return <InputText { ...value } />;
    } else {
      return <div { ...value }>{key}</div>
    }
  });
}

export default Browse;