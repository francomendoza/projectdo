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
      buttons: [
        { id: 1, description: 'Get' },
        { id: 2, description: 'Research' },
        { id: 3, description: 'Make' },
        { id: 4, description: 'Amazon' },
        { id: 5, description: 'Read' },
        { id: 6, description: 'Watch' },
        { id: 7, description: 'Listen' },
        { id: 8, description: 'Schedule' },
      ]
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
        {this.state.buttons.map((button_obj, index) => {
          return <Button
            onPress={this.props.selectCategory(button_obj)}
            title={button_obj.description}
            backgroundColor='#54a3ff'
            key={index + button_obj.id}
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
