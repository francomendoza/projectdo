import React from 'react';
import MissionControlApp from './components/MissionControlApp';
import configStore from './redux/configStore';
import { Provider } from 'react-redux';

const store = configStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MissionControlApp/>
      </Provider>
    );
  }
}
