import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import TaskList from '../TaskList';

export default class HomePage extends React.Component {

  render() {
    return (
      <View>
        <Button
          onPress={this.props.handleNewTask}
          title='New Task'
          backgroundColor='#54a3ff'
          raised
        />
        <TaskList
          tasks={this.props.tasks}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // button: {
  //   height: 50,
  //   backgroundColor: '#54a3ff',
  //   borderRadius: 6,
  //   width: 300
  // }
});
