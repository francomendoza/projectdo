import React from 'react';
// import { Card, CardItem, Body, View, Title, Content, Button, Text } from 'native-base';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class TaskList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleNewTask = this.handleNewTask.bind(this);
  //
  //   this.state = {
  //     text: false,
  //     tasks: []
  //   };
  // }

  render() {
    return (
      <View>
        {this.props.tasks.map((task, index) => {
          return <Text
            key={task+index}
          >{task}</Text>;
        })}
      </View>
    );
  }
}
