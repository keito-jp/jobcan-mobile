import * as React from "react";
import {
  Provider
} from "react-redux";
import {
  applyMiddleware,
  createStore
} from "redux";
import createSagaMiddleware from "redux-saga";
import { Body, Container, Header, Title } from "native-base";
import reducers from "./reducers";
import PunchingIn from "./PunchingIn";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

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
