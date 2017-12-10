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
import { Notifications } from 'expo';
import HomePage from '../HomePage';
import TaskInput from '../TaskInput';
import TaskCategorySelector from '../TaskCategorySelector';
import TaskDueDate from '../TaskDueDate';
import TaskEdit from '../TaskEdit';
import { addNewMission } from '../../redux/actions';
import { dueDateCategories } from '../../utils/dueDateCategories';
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync';
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
    this.handleOnEditTask = this.handleOnEditTask.bind(this);

    this.state = {
      page: 'action',
      new_task: {
        name: "",
        category_id: "",
        due_date: ''
      }
    };
  }

  componentDidMount() {
    registerForPushNotificationsAsync();

    const notification_listener = Notifications.addListener(({ origin, data, remote }) => {
      // when notification is received save to server when it was opened
      let body = {
        notification_id: data.notification_id,
      };

      if (origin === 'selected') {
        Object.assign(body, {
          status: 'acknowledged',
          acknowledged_at: new Date(),
        });
      } else {
        Object.assign(body, { status: 'received' });
      }

      fetch(`${HOST_NAME}/notifications/update`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Server failed on notification update');
        }
      });
    })
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

  handleSelectDueDate(due_date_option, date) {
    return () => {
      // set due_date_option on new_task
      let due_date;
      if (!date) {
        let due_date_obj = dueDateCategories.find(cat => cat.label === due_date_option);
        due_date = due_date_obj.datetime;
      } else {
        due_date = moment(date).endOf('day');
      }
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
          due_date: {
            datetime: due_date,
            option: due_date_option,
          },
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

  handleOnEditTask(item) {
    return () => {
      this.setState({
        page: 'task_edit',
        edit_task_id: item.id
      });
    }
  }

  render() {
    let comp;
    if (this.state.page === 'action') {
      comp = <HomePage
        tasks_by_due_date_category={this.props.tasks_by_due_date_category}
        handleNewTask={this.handleNewTask}
        onEditTask={this.handleOnEditTask}
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
    } else if (this.state.page === 'task_edit') {
      comp = <TaskEdit
        task={this.props.tasks_by_id[this.state.edit_task_id]}
        dispatch={this.props.dispatch}
        onSave={() => this.setState({ page: 'action' })}
        onCancel={this.handleOnCancel}
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

const generateTasksByDueDate = (state) => {
  return state.mission_ids.reduce((accum, mission_id) => {
    let task = state.missions_by_id[mission_id];

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
    task_ids: state.mission_ids,
    tasks_by_id: state.missions_by_id,
    tasks_by_due_date_category: generateTasksByDueDate(state),
  };
}

const MappedMissionControlApp = connect(mapStateToProps)(MissionControlApp);

export default MappedMissionControlApp;
