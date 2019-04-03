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

// function compute_input(key, input, index) {
//   if(input.type === "select") {
//     return compute_select(key, input, index)
//   } else if(input.type === "checkbox") {
//     return compute_checkbox(key, input, index)
//   } else {
//     return <input
//       key={`form-input-${index}` }
//       value={ input.value }
//       type={ input.type }
//       placeholder={ key }
//       name={ key }
//     />
//   }
// }

// function compute_checkbox(key, input, index) {
//   return (
//     <div className={ styles.input }>
//       <label htmlFor={ key }>{ key }</label>
//       <input name={ key } type="checkbox" key={`form-input-${index}` } />
//     </div>
//   )
// }

// function compute_select(key, input, index) {
//   return (
//     <div className={ styles.input }>
//       <label htmlFor={ key }>{ key }</label>
//       <select name={ key } key={ `form-input-${index}` }></select>
//     </div>
//   )
// }


export default FormInput;