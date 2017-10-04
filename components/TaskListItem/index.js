import React from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  TouchableHighlight,
  Text,
  Alert,
} from 'react-native';
import {
  Button,
  List,
  ListItem,
} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { dueDateCategories } from '../../utils/dueDateCategories';
import { removeMission } from '../../redux/actions';
import { HOST_NAME } from '../../utils/host_name';

export default class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onRightActionRelease = this.onRightActionRelease.bind(this);
  }

  onRightActionRelease() {
    fetch(`${HOST_NAME}/missionstatus/update`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mission_id: this.props.item.id,
        status: 'complete',
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
        // for now just remove mission from list
        this.props.dispatch(removeMission(this.props.item.id));
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
    const rightButtons = [
      <TouchableHighlight
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#54a3ff'}}
        onPress={this.onRightActionRelease}>
        <Text style={{paddingLeft: 6, color: 'white'}}>Complete</Text>
      </TouchableHighlight>,
    ];

    return (
      <Swipeable
        rightButtons={rightButtons}
        onRightActionRelease={this.onRightActionRelease}
        rightActionActivationDistance={300}
        onSwipeStart={this.props.setSectionListScroll(false)}
        onSwipeRelease={this.props.setSectionListScroll(true)}
      >
        <ListItem
          title={this.props.item.description}
          onPress={this.props.onEditTask(this.props.item)}
        />
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
});
