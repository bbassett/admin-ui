import React, { Component } from 'react';
// import styles from './Link.module.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';

class Link extends Component {
  render() {
    return (
      <ListItem divider button onClick={ () => window.location = link(this.props.href) }>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText inset primary={ this.props.href } />
      </ListItem>
    )
  }
}

function link(url) {
  if(url) {
    return new URL(url || '').pathname;
  } else {
    return ''
  }
}

export default Link;