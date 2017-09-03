import React from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
} from 'react-native';
import {
  Button,
  List,
  ListItem,
} from 'react-native-elements';
import { dueDateCategories } from '../../utils/dueDateCategories';

export default class HomePage extends React.Component {
  renderSectionHeader({section}) {
    return <Text
      style={styles.sectionHeader}
    >{section.sectionName}</Text>;
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
      renderItem={({item}) => <ListItem title={item.description}/>}
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
