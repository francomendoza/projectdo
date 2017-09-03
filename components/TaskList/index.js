import React from 'react';
import { List, ListItem } from 'react-native-elements';

export default class TaskList extends React.Component {

  render() {
    return (
      <List style={{width: 300, flex: 1}}>
        {this.props.tasks.map((task, index) => {
          return (
            <ListItem
              key={task.description + index}
              title={task.description}
            />
          );
        })}
      </List>
    );
  }
}
