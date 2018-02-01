import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import CustomDateSelector from '../CustomDateSelector';
import { dueDateCategories } from '../../utils/dueDateCategories';

export default class TaskDueDate extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCustomDatePicker = this.toggleCustomDatePicker.bind(this);
    this.handleOnCustomDateChange = this.handleOnCustomDateChange.bind(this);

    this.state = {
      displayCustomDatePicker: false,
      custom_date: new Date(),
    };
  }

  toggleCustomDatePicker() {
    this.setState((prevState) => {
      return {
        displayCustomDatePicker: !prevState.displayCustomDatePicker
      };
    });
  }

  handleOnCustomDateChange(date) {
    this.setState({custom_date: date});
  }

  render() {
    let dateComponent;
    if (this.state.displayCustomDatePicker) {
      dateComponent = <CustomDateSelector
        onCancel={this.toggleCustomDatePicker}
        date={this.state.custom_date}
        onDateChange={this.handleOnCustomDateChange}
        onSave={this.props.selectDueDate('Custom', this.state.custom_date)}
      />;
    } else {
      dateComponent = <View>
        <Icon
          name='close'
          color='#00aced'
          onPress={this.props.onCancel}
        />
        {dueDateCategories.map((cat, index) => {
          return (
            <Button
              onPress={this.props.selectDueDate(cat.label)}
              title={cat.label}
              backgroundColor='#54a3ff'
              key={index + cat.label}
              style={styles.button}
              raised
            />
          );
        })}
        <Button
          onPress={this.toggleCustomDatePicker}
          title='Custom'
          backgroundColor='#54a3ff'
          style={styles.button}
          raised
        />
      </View>;
    }

    return (
      dateComponent
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    margin: 10
  }
});
