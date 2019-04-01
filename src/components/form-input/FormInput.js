import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class FormInput extends Component {

  render() {
    return (
      <ListItem>
        <ListItemText primary={ this.props.name } />
        <ListItemSecondaryAction>
          <Input
            placeholder={ this.props.key }
            name={ this.props.name }
            type={ this.props.type }
            key={ `form-input-${this.props.index}` }
            value={ this.props.value }
            required={ this.props.required }
            disabled={ this.props.disabled }
         />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}


export default FormInput;