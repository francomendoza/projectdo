import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import HomePage from './components/HomePage';
import TaskInput from './components/TaskInput';
import TaskCategorySelector from './components/TaskCategorySelector';
import TaskDueDate from './components/TaskDueDate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleConfirmNewTask = this.handleConfirmNewTask.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleOnNewTaskChange = this.handleOnNewTaskChange.bind(this);
    this.handleOnCancel = this.handleOnCancel.bind(this);
    this.handleSelectDueDate = this.handleSelectDueDate.bind(this);

    this.state = {
      page: 'action',
      tasks: ["task1","task2"],
      new_task: {
        name: "",
        category: "",
        due_date: ''
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

  handleSelectDueDate(due_date) {
    return () => {
      // set due_date on new_task
      // POST data then reset UI
      this.setState((prevState, props) => {
        return {
          new_task: {
            name: '',
            category: '',
            due_date: ''
          },
          page: 'action'
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
        page: 'due_date'
      };
    });
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

  handleOnCancel() {
    this.setState({
      page: 'action',
      new_task: {
        name: '',
        category: ''
      }
    });
  }

  render() {
    let comp;
    if (this.state.page === 'action') {
      comp = <HomePage
        tasks={this.state.tasks}
        handleNewTask={this.handleNewTask}
      />;
    } else if (this.state.page === 'category_selection') {
      comp = <TaskCategorySelector
        selectCategory={this.handleSelectCategory}
        onCancel={this.handleOnCancel}
      />;
    } else if (this.state.page === 'new_task') {
      comp = <TaskInput
        value={this.state.new_task.name}
        onNewTaskChange={this.handleOnNewTaskChange}
        confirmNewTask={this.handleConfirmNewTask}
        onCancel={this.handleOnCancel}
      />;
    } else if (this.state.page === 'due_date') {
      comp = <TaskDueDate
        selectDueDate={this.handleSelectDueDate}
      />
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {comp}
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
