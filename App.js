import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import TaskCategorySelector from './components/TaskCategorySelector';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleConfirmNewTask = this.handleConfirmNewTask.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleOnNewTaskChange = this.handleOnNewTaskChange.bind(this);

    this.state = {
      page: 'action',
      tasks: ["task1","task2"],
      new_task: {
        name: "",
        category: ""
      }
    };
  }

  handleNewTask() {
    this.setState((prevState, props) => {
      return {
        page: 'category_selection'
      };
    });
  }

  handleSelectCategory(category_name) {
    return () => {
      this.setState((prevState, props) => {
        // add text to input field
        return {
          page: 'new_task',
          new_task: {
            name: `${category_name} `,
            category: category_name
          }
        };
      });
    };
  }

  handleConfirmNewTask() {
    Keyboard.dismiss();
    this.setState((prevState, props) => {
      // validate
      let tasks = [...prevState.tasks, prevState.new_task.name];
      return {
        tasks,
        new_task: {
          name: '',
          category: ''
        }
      };
    });
    // POST data and wait/act on response
  }

  handleOnNewTaskChange(text) {
    this.setState((prevState, props) => {
      return {
        new_task: {
          name: text,
          category_name: prevState.new_task.category_name
        }
      };
    });
  }

  render() {
    let comp;
    if (this.state.page === 'action') {
      comp = <Button
        onPress={this.handleNewTask}
        title='New Task'
        backgroundColor='#54a3ff'
        raised
      />;
    } else if (this.state.page === 'category_selection') {
      comp = <TaskCategorySelector
        selectCategory={this.handleSelectCategory}
      />;
    } else if (this.state.page === 'new_task') {
      comp = <TaskInput
        value={this.state.new_task.name}
        onNewTaskChange={this.handleOnNewTaskChange}
        confirmNewTask={this.handleConfirmNewTask}
      />;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {comp}
          <TaskList
            tasks={this.state.tasks}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
