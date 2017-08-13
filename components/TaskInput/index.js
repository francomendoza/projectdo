import React from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import { Button } from 'react-native-elements';

export default class TaskInput extends React.Component {

  render() {
    let textInputStyle = {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 300
    };
    return (
      <View>
        <TextInput
          style={textInputStyle}
          onChangeText={this.props.onNewTaskChange}
          value={this.props.value}
        />
        <Button
          title="Add!"
          onPress={this.props.confirmNewTask}
          raised
        />
      </View>
    );
  }
}
