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
import { connect } from 'react-redux';
import HomePage from '../HomePage';
import TaskInput from '../TaskInput';
import TaskCategorySelector from '../TaskCategorySelector';
import TaskDueDate from '../TaskDueDate';
import { addNewMission } from '../../redux/actions';

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

const due_date_categories = [
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

const generateTasksByDueDate = (tasks) => {
  return tasks.reduce((accum, task) => {

    let cat = due_date_categories.find((cat) => {
      return moment(task.due_date).isBefore(cat.datetime);
    });

    // TODO: fix this shit, tasks should end up in the correct bucket
    cat = cat || {
      label: 'Eventually',
      datetime: null
    };

    if (!accum[cat.label]) {
      accum[cat.label] = [];
    }

    accum[cat.label].push(task);

    return accum;

  }, {});
};

const mapStateToProps = (state) => {
  return {
    tasks: state.missions,
    tasks_by_due_date_category: generateTasksByDueDate(state.missions)
  };
}

const MappedMissionControlApp = connect(mapStateToProps)(MissionControlApp);

export default MappedMissionControlApp;
