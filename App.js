import React from 'react';
import MappedMissionControlApp from './components/MissionControlApp';
import configStore from './redux/configStore';
import { Provider } from 'react-redux';
import { populateMissions } from './redux/actions';

const store = configStore();

fetch('http://localhost:3000/missions', {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => {
  let tasks = data.data;

  store.dispatch(populateMissions(tasks));
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MappedMissionControlApp/>
      </Provider>
    );
  }
}
