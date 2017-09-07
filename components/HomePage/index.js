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

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      sectionListScrollEnabled: true
    }
  }

  renderSectionHeader({section}) {
    return <Text
      style={styles.sectionHeader}
    >{section.sectionName}</Text>;
  }

  renderItem({item}) {
    const onRightActionRelease = () => {
      fetch(`${HOST_NAME}/missionstatus/update`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mission_id: item.id,
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
          this.props.dispatch(removeMission(item.id));
        }
      })
      .catch((error) => {
        Alert.alert(
          'Sorry',
          `Fetch failed sorry dude: ${error}`
        );
      });
    };

    const rightButtons = [
      <TouchableHighlight
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#54a3ff'}}
        onPress={onRightActionRelease}>
        <Text style={{paddingLeft: 6, color: 'white'}}>Complete</Text>
      </TouchableHighlight>,
    ];

    return (
      <Swipeable
        rightButtons={rightButtons}
        onRightActionRelease={onRightActionRelease}
        rightActionActivationDistance={300}
        onSwipeStart={() => this.setState({sectionListScrollEnabled: false})}
        onSwipeRelease={() => this.setState({sectionListScrollEnabled: true})}
      >
        <ListItem title={item.description}/>
      </Swipeable>
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

    let sectionList = <SectionList
      renderSectionHeader={this.renderSectionHeader}
      renderItem={this.renderItem}
      keyExtractor={(item) => item.description}
      sections={sections}
      scrollEnabled={this.state.sectionListScrollEnabled}
    />;

    return (
      <View style={StyleSheet.absoluteFill}>
        <Button
          onPress={this.props.handleNewTask}
          title='New Mission'
          backgroundColor='#54a3ff'
          raised
        />
        <View style={styles.container}>
          <List style={styles.list}>
            {sectionList}
          </List>
        </View>
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
