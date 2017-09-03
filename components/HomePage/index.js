import React from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  TouchableHighlight,
  Text,
} from 'react-native';
import {
  Button,
  List,
  ListItem,
} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { dueDateCategories } from '../../utils/dueDateCategories';
import { removeMission } from '../../redux/actions';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderSectionHeader({section}) {
    return <Text
      style={styles.sectionHeader}
    >{section.sectionName}</Text>;
  }

  renderItem({item}) {
    const rightButtons = [
      <TouchableHighlight
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#54a3ff'}}>
      <Text style={{paddingLeft: 6, color: 'white'}}>Complete</Text>
      </TouchableHighlight>,
    ];

    const onRightActionRelease = () => {
      this.props.dispatch(removeMission(item.id));
    };

    return (
      <Swipeable
        rightButtons={rightButtons}
        onRightActionRelease={onRightActionRelease}
        rightActionActivationDistance={300}>
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
