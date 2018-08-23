import { Container } from "native-base";
import * as React from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { clearCompletion } from "./actions";
import Home from "./containers/Home";
import Settings from "./containers/Settings";
import reducers, { IStore } from "./reducers";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

const RootStack = createStackNavigator({
  Home,
  Settings
});

interface IStateProps {
  completionMessage: string;
}

interface IDispatchProps {
  clearCompletion: () => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const RootContainer = connect(
  (state: IStore) => {
    return {
      completionMessage: state.complete.message
    };
  },
  dispatch => {
    return {
      clearCompletion: () => dispatch(clearCompletion())
    };
  }
)(
  class RootContainer extends React.Component<IProps, {}> {
    public componentDidUpdate() {
      if (this.props.completionMessage != null) {
        Alert.alert(this.props.completionMessage);
        this.props.clearCompletion();
      }
    }
    public render() {
      return (
        <Container>
          <RootStack />
        </Container>
      );
    }
  }
);

export default class App extends React.Component<IProps, {}> {
  public componentDidUpdate() {
    if (this.props.completionMessage != null) {
      Alert.alert(this.props.completionMessage);
      this.props.clearCompletion();
    }
  }
  public render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
