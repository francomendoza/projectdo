import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Button,
  Keyboard
} from 'react-native';
// import { Container, Header, Body, View, Title, Content, Button, Text } from 'native-base';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleConfirmNewTask = this.handleConfirmNewTask.bind(this);

    this.state = {
      text: false,
      tasks: ["task1","task2"]
    };
  }

  handleNewTask() {
    this.setState((prevState, props) => {
      return {
        text: !prevState.text
      };
    });
  }

  handleConfirmNewTask(value) {
    return () => {
      Keyboard.dismiss();
      this.setState((prevState, props) => {
        let tasks = [...prevState.tasks, value];
        return {
          tasks
        };
      })
    }
  }

  render() {
    let comp;
    if (this.state.text) {
      comp = <TaskInput
        confirmNewTask={this.handleConfirmNewTask}
      />;
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Button
            onPress={this.handleNewTask}
            title="New Task"
          />
          {comp}
          <TaskList
            tasks={this.state.tasks}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
