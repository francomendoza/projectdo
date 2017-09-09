import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Keyboard
} from 'react-native';
import { Button, Header } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import HomePage from '../HomePage';
import TaskInput from '../TaskInput';
import TaskCategorySelector from '../TaskCategorySelector';
import TaskDueDate from '../TaskDueDate';
import { addNewMission } from '../../redux/actions';
import { dueDateCategories } from '../../utils/dueDateCategories';
import { HOST_NAME } from '../../utils/host_name';

class MissionControlApp extends React.Component {
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
      new_task: {
        name: "",
        category_id: "",
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

  handleSelectCategory(category_obj) {
    return () => {
      this.setState((prevState, props) => {
        // add text to input field
        const name = category_obj.description === 'Other' ?
          '' : `${category_obj.description} `;

        const new_task = Object.assign({},
          prevState.new_task,
          {
            name,
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
      fetch(`${HOST_NAME}/missions/create`, {
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
        let missionData = data.data;
        this.props.dispatch(addNewMission(missionData));
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
      return {
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
        tasks_by_due_date_category={this.props.tasks_by_due_date_category}
        handleNewTask={this.handleNewTask}
        dispatch={this.props.dispatch}
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
      <View
      style={StyleSheet.absoluteFill}
      onPress={Keyboard.dismiss}>
        <Header
          leftComponent={<View/>}
          centerComponent={<Text>Mission Control</Text>}
          rightComponent={<View/>}
        />
        <View style={{marginTop: 100, alignItems: 'center', flex: 1}}>
          {comp}
        </View>
      </View>
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

const generateTasksByDueDate = (tasks) => {
  return tasks.reduce((accum, task) => {

    let cat = dueDateCategories.find((cat) => {
      if (cat.label === 'Eventually') {
        return true;
      }
      return moment(task.due_date).isSameOrBefore(cat.datetime);
    });

    // TODO: fix this shit, tasks should end up in the correct bucket
    cat = cat;

    if (!accum[cat.label]) {
      accum[cat.label] = [];
    }

    accum[cat.label].push(task);

    return accum;

  }, {});

  // {
  //   EOD: [{task1}, {task2}]
  // }
};

const mapStateToProps = (state) => {
  return {
    tasks: state.missions,
    tasks_by_due_date_category: generateTasksByDueDate(state.missions)
  };
}

const MappedMissionControlApp = connect(mapStateToProps)(MissionControlApp);

export default MappedMissionControlApp;
