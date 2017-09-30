import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';
import TaskList from '../TaskList';

export default class HomePage extends React.Component {
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Button
          onPress={this.props.handleNewTask}
          title='New Mission'
          backgroundColor='#54a3ff'
          raised
        />
        <TaskList
          tasks_by_due_date_category={this.props.tasks_by_due_date_category}
          dispatch={this.props.dispatch}
        />
      </View>
    );
  }
}
