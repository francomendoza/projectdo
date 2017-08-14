import React from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class TaskInput extends React.Component {

  render() {
    let textInputStyle = {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 300,
      margin: 10
    };
    return (
      <View>
        <Icon
          name='close'
          color='#00aced'
          onPress={this.props.onCancel}
        />
        <TextInput
          style={textInputStyle}
          onChangeText={this.props.onNewTaskChange}
          value={this.props.value}
          autoFocus
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
