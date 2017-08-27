import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import HomePage from './components/HomePage';
import TaskInput from './components/TaskInput';
import TaskCategorySelector from './components/TaskCategorySelector';
import TaskDueDate from './components/TaskDueDate';

export default class MissionControlApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleConfirmNewTask = this.handleConfirmNewTask.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleOnNewTaskChange = this.handleOnNewTaskChange.bind(this);
    this.handleOnCancel = this.handleOnCancel.bind(this);
    this.handleSelectDueDate = this.handleSelectDueDate.bind(this);

    this.generateTasksByDueDate = this.generateTasksByDueDate.bind(this);

    const tasks = [
      {
        id: 1,
        description: 'task1',
        category_id: 1,
        due_date: '2017-08-29'
      },
      {
        id: 2,
        description: 'task2',
        category_id: 1,
        due_date: '2017-08-27'
      },
      {
        id: 3,
        description: 'task3',
        category_id: 1,
        due_date: '2017-09-27'
      }
    ];

    this.due_date_categories = [
      {
        label: 'EOD',
        datetime: moment().endOf('day')
      },
      {
        label: 'EOWeek',
        datetime: moment().endOf('week').subtract(2, 'days')
      },
      {
        label: 'EOWeekend',
        datetime: moment().endOf('week')
      },
      {
        label: 'EOMonth',
        datetime: moment().endOf('month')
      },
      {
        label: 'EOYear',
        datetime: moment().endOf('year')
      },
      {
        label: 'Eventually',
        datetime: null
      },
    ];

    let tasks_by_due_date_category = {};

    this.state = {
      page: 'action',
      tasks_by_due_date_category,
      tasks,
      new_task: {
        name: "",
        category_id: "",
        due_date: ''
      }
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/missions', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      let tasks = data.data,
        tasks_by_due_date_category = this.generateTasksByDueDate(tasks);

      this.setState({
        tasks,
        tasks_by_due_date_category
      });
    });
  }

  generateTasksByDueDate(tasks) {
    return tasks.reduce((accum, task) => {

      const cat = this.due_date_categories.find((cat) => {
        return moment(task.due_date).isBefore(cat.datetime);
      });

      if (!accum[cat.label]) {
        accum[cat.label] = [];
      }

      accum[cat.label].push(task);

      return accum;

    }, {});
  }

  handleNewTask() {
    this.setState((prevState, props) => {
      return {
        page: 'category_selection'
      };
    });
  }

  handleSelectCategory(category_obj) {
    return () => {
      this.setState((prevState, props) => {
        // add text to input field
        const new_task = Object.assign({},
          prevState.new_task,
          {
            name: `${category_obj.description} `,
            category_id: category_obj.id
          }
        );

        return {
          page: 'new_task',
          new_task
        };
      });
    };
  }

  handleSelectDueDate(due_date) {
    return () => {
      // set due_date on new_task
      // POST data then reset UI
      fetch('http://localhost:3000/missions/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: this.state.new_task.name,
          category_id: this.state.new_task.category_id,
          option: due_date
        })
      })
      .then(response => response.json())
      .then(data => {

      });
      // reset UI
      this.setState((prevState, props) => {
        return {
          new_task: {
            name: '',
            category_id: null,
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
      let new_task = {
        id: null,
        description: prevState.new_task.name,
        category_id: prevState.new_task.category_id,
        due_date: null
      };

      let tasks = [...prevState.tasks, new_task];

      return {
        tasks,
        page: 'due_date'
      };
    });
  }

  handleOnNewTaskChange(text) {
    this.setState((prevState, props) => {
      const new_task = Object.assign({}, prevState.new_task, { name: text });
      return {
        new_task
      };
    });
  }

  handleOnCancel() {
    this.setState({
      page: 'action',
      new_task: {
        name: '',
        category_id: null,
        due_date: ''
      }
    });
  }

  render() {
    let comp;
    if (this.state.page === 'action') {
      comp = <HomePage
        tasks_by_due_date_category={this.state.tasks_by_due_date_category}
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
          <View style={{height: 100}}/>
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
  }
});
