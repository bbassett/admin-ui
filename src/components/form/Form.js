import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

class Form extends Component {
  state = {open: true}
  render() {
    return (
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding subheader={<ListSubheader>{ this.props.subheader }</ListSubheader>}>
          <form>
            { this.props.children }
          </form>
          <button type="submit">Submit</button>
        </List>
      </Collapse>
    );
  }
}


export default Form;