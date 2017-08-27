import React from 'react';
import {
  StyleSheet,
  View,
  Text,
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
        {Object.keys(this.props.tasks_by_due_date_category).map((cat_key, index) => {
          return (
            <View
              key={index + cat_key + '-view'}
            >
              <Text
                key={index + cat_key + '-title'}
              >{cat_key}</Text>
              <TaskList
                tasks={this.props.tasks_by_due_date_category[cat_key]}
                key={index + cat_key + '-list'}
              />
            </View>
          );
        })}
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
