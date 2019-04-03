import React, { Component } from 'react';
import styles from './Form.module.css';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UpdateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class Form extends Component {
  state = {open: true}

  toggleCollapse = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    return [
      <ListItem key={ `${this.props.reactKey}-form-heading` } divider button onClick={ this.toggleCollapse }>
        <ListItemIcon key={ `${this.props.reactKey}-form-heading-icon` } >
          <UpdateIcon />
        </ListItemIcon>
        <ListItemText inset className={ styles.capitalize } primary={ this.props.header } secondary={ this.props.subHeader } key={ `${this.props.reactKey}-form-heading-text` } />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>,
      <Collapse key={ `${this.props.reactKey}-form-body` } in={this.state.open} timeout="auto" unmountOnExit className={ styles.nested }>
        <form key={ `${this.props.reactKey}-form-body-form` }>
          <List component="div" disablePadding subheader={<ListSubheader>{ this.props.subheader }</ListSubheader>}>
            { this.props.children }
            <ListItem key={`${this.props.reactKey}-form-body-inputs` } divider >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset primary="Submit" />
            </ListItem>
          </List>
        </form>
      </Collapse>
    ]
  }
}


export default Form;