import React, { Component } from 'react';
// import styles from './Link.module.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

class InputCheckbox extends Component {
  state = {
    checked: false,
  };

  handleToggle = () => {
    this.setState(state => ({checked: !state.checked}))
  }

  render() {
    return (
      <ListItem divider>
        <ListItemText inset primary={ this.props.label } />
        <ListItemSecondaryAction>
          <Checkbox
            onClick={ this.handleToggle }
            checked={this.state.checked}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default InputCheckbox;