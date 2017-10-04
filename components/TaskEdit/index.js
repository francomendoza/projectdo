import React from 'react';
import {
  StyleSheet,
  View,
  DatePickerIOS,
  Alert,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { updateMissionDueDate } from '../../redux/actions';
import moment from 'moment';
import { HOST_NAME } from '../../utils/host_name';

export default class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnDateChange = this.handleOnDateChange.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);

    this.state = {
      due_date: new Date()
    };
  }

  handleOnDateChange(due_date) {
    this.setState({ due_date });
  }

  handleOnSave() {
    let due_date = moment(this.state.due_date).endOf('day');
    fetch(`${HOST_NAME}/missionduedate/update`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mission_id: this.props.task.id,
        due_date,
        option: 'custom',
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Network response failed somehow.`);
    })
    .then(data => {
      if (data.status == 'SUCCESS') {
        this.props.dispatch(
          updateMissionDueDate(this.props.task.id, due_date)
        );
        this.props.onSave();
      }
    })
    .catch((error) => {
      Alert.alert(
        'Sorry',
        `Fetch failed sorry dude: ${error}`
      );
    });
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
          date={this.state.due_date}
          onDateChange={this.handleOnDateChange}
          mode='date'
        />
        <Button
          onPress={this.handleOnSave}
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
