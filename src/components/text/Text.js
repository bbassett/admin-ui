import React, { Component } from 'react';
import styles from './Text.module.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class Text extends Component {
  render() {
    return <ListItem divider>
      <ListItemText inset
        primary={ this.props.fieldKey }
        secondary={
          <React.Fragment>
            <Typography component="span" className={ styles.inline }>
              { readable_value(this.props.value) }
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  }
}

function readable_value(value) {
  if(typeof(value) === "boolean") {
    return <span className={ styles.boolean }>{ value ? "true" : "false" }</span>
  } else if(value === null) {
    return <span className={ styles.null }>null</span>
  } else {
    return <span className={ styles.text }>{ value }</span>
  }
}

export default Text;