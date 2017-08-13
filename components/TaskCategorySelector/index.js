import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';

export default class TaskCategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: ['Get', 'Research', 'Make']
    };
  }

  render() {
    return (
      <View>
        {this.state.buttons.map((button_name, index) => {
          return <Button
            onPress={this.props.selectCategory(button_name)}
            title={button_name}
            backgroundColor='#54a3ff'
            key={index + button_name}
            raised
          />;
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
