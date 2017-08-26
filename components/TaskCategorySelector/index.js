import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class TaskCategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: ['Get', 'Research', 'Make', 'Amazon', 'Read', 'Watch', 'Listen']
    };
  }

  render() {
    return (
      <View>
        <Icon
          name='close'
          color='#00aced'
          onPress={this.props.onCancel}
        />
        {this.state.buttons.map((button_name, index) => {
          return <Button
            onPress={this.props.selectCategory(button_name)}
            title={button_name}
            backgroundColor='#54a3ff'
            key={index + button_name}
            style={styles.button}
            raised
          />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    margin: 10
  }
});
