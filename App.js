import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Body, Title, Content, Button, Text } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);

    this.state = {
      text: false,
      tasks: []
    };
  }

  handleNewTask() {
    this.setState((prevState, props) => {
      return {
        text: !prevState.text
      };
    });
  }

  render() {
    let comp;
    if (this.state.text) {
      comp = <Text>Shake your phone to open the developer menu.</Text>;
    }
    return (
      <Container>
        <Header>
          <Body>
            <Title>ProjectDo</Title>
          </Body>
        </Header>
        <Button
          onPress={this.handleNewTask}
        ><Text>New Task</Text></Button>
        {comp}
      </Container>
    );
  }
}
