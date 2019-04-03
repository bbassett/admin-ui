import React, { Component } from 'react';
import styles from './Collection.module.css';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrayIcon from '@material-ui/icons/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class Collection extends Component {
  state = {
    open: false
  }

  toggleCollapse = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    return [
      <ListItem key={ `${this.props.reactKey}-heading` } divider button onClick={ this.toggleCollapse }>
        <ListItemIcon>
          <ArrayIcon />
        </ListItemIcon>
        <ListItemText inset primary={ [this.props.fieldKey, <span key={ `${this.props.reactKey}-count` }>{ ` (${ this.props.children.length})` }</span>] } />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>,
      <Collapse className={ styles.nested } key={ `${this.props.reactKey}-collection` } in={this.state.open} timeout="auto" unmountOnExit >
        <List component="div" disablePadding >{ this.props.children }</List>
      </Collapse>
    ]
  }
}

export default Collection;