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
import TaskListItem from '../TaskListItem';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.setSectionListScroll = this.setSectionListScroll.bind(this);

    this.state = {
      sectionListScrollEnabled: true
    }
  }

  renderSectionHeader({section}) {
    return <Text
      style={styles.sectionHeader}
    >{section.sectionName}</Text>;
  }

  setSectionListScroll(bool) {
    return () => this.setState({ sectionListScrollEnabled: bool });
  }

  renderItem({item}) {
    return (
      <TaskListItem
        setSectionListScroll={this.setSectionListScroll}
        item={item}
        onEditTask={this.props.onEditTask}
        dispatch={this.props.dispatch}
      />
    );
  }

  render() {
    let sections = dueDateCategories
      .map((category_obj, index) => {
        return {
          sectionName: category_obj.label,
          data: this.props.tasks_by_due_date_category[category_obj.label] || []
        };
      });

    return (
      <View style={styles.container}>
        <List style={styles.list}>
          <SectionList
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.description}
            sections={sections}
            scrollEnabled={this.state.sectionListScrollEnabled}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: 300,
  },
  sectionHeader: {
    height: 20,
    padding: 2,
  },
});
