import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Text.module.css';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

class InputText extends Component {
  render() {
    return (
      <ListItem>
        <TextField
          id={this.props.name}
          name={this.props.name}
          label={ this.props.label }
          className={ classNames(styles.textField, styles.dense)}
          margin="dense"
          fullWidth
          defaultValue={ this.props.value }
          type={ this.props.type }
          disabled={ this.props.disabled }
        />
     </ListItem>
    )
  }
}

export default InputText;