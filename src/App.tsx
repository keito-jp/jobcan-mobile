import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Body, Container, Header, Title } from "native-base";
import reducers from "./reducers";
import PunchingIn from "./PunchingIn";

const store = createStore(reducers, {});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Header>
            <Body>
              <Title>ジョブカン</Title>
            </Body>
          </Header>
          <PunchingIn />
        </Container>
      </Provider>
    );
  }
}
