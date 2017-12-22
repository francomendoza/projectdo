import React from 'react';
import {
  StyleSheet,
  View,
  DatePickerIOS,
  Alert,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { updateMissionDueDate } from '../../redux/actions';
import { dueDateCategories } from '../../utils/dueDateCategories';
import moment from 'moment';
import { HOST_NAME } from '../../utils/host_name';
import TaskDueDate from '../TaskDueDate';

export default class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.selectDueDate = this.selectDueDate.bind(this);
  }

  selectDueDate(option, date) {
    return () => {
      let due_date;
      if (!date) {
        let due_date_obj = dueDateCategories.find(cat => cat.label === option);
        due_date = due_date_obj.datetime;
      } else {
        due_date = moment(date).endOf('day');
      }

      fetch(`${HOST_NAME}/missionduedate/update`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mission_id: this.props.task.id,
          due_date,
          option,
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
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TaskDueDate
          onCancel={this.props.onCancel}
          selectDueDate={this.selectDueDate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignItems: 'center',
    flex: 1
  }
});
