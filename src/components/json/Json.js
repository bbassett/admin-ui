import React, { Component } from 'react';
import styles from './Json.module.css';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeIcon from '@material-ui/icons/Code';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class Json extends Component {
  state = { open: false }

  toggleCollapse = () => {
    this.setState(state => ({ open: !state.open }))
  }
  render() {
    return [
      <ListItem key='json-heading' divider button onClick={ this.toggleCollapse }>
        <ListItemIcon>
          <CodeIcon />
        </ListItemIcon>
        <ListItemText inset primary="View JSON response" />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>,
      <Collapse key='json' in={this.state.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem divider className={ styles.nested }>
            <div className={ styles.json }>
              <pre>
                <code>
                  { this.props.children }
                </code>
              </pre>
            </div>
          </ListItem>
        </List>
      </Collapse>
    ]
  }
}

export default Json;