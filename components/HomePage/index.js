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

  render() {
    let sections = dueDateCategories
      .map((category_obj, index) => {
        return {
          sectionName: category_obj.label,
          data: this.props.tasks_by_due_date_category[category_obj.label] || []
        };
      });

    const renderSectionHeader = ({section}) => {
      return <Text>{section.sectionName}</Text>;
    }
    let sectionList = <SectionList
      renderSectionHeader={renderSectionHeader}
      renderItem={({item}) => <ListItem title={item.description}/>}
      keyExtractor={(item) => item.description}
      sections={sections}
    />;

    return (
      <View style={styles.container}>
        <Button
          onPress={this.props.handleNewTask}
          title='New Mission'
          backgroundColor='#54a3ff'
          raised
        />
        <List>
          {sectionList}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    flex: 1
  }
});
