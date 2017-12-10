import React from 'react';
import {
  StyleSheet,
  View,
  DatePickerIOS,
  Alert,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class CustomDateSelector extends React.Component {
  constructor(props) {
    super(props);

    this.today = new Date();
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name='close'
          color='#00aced'
          onPress={this.props.onCancel}
        />
        <DatePickerIOS
          date={this.props.date}
          minimumDate={this.today}
          onDateChange={this.props.onDateChange}
          mode='date'
        />
        <Button
          onPress={this.props.onSave}
          title='Save'
          backgroundColor='#54a3ff'
          raised
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300
  }
});
