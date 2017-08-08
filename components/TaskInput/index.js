import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default class TaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

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
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          title="Add!"
          onPress={this.props.confirmNewTask(this.state.text)}
        />
      </View>
    );
  }
}
