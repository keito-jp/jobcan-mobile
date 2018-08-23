import * as React from "react";
import { View } from "react-native";
import {
  NavigationContainerProps,
  NavigationScreenConfig
} from "react-navigation";
import { connect } from "react-redux";
import {
  IAccount,
  IReadAccountSuccessPayload,
  readAccount,
  saveAccount
} from "../actions";
import AccountForm from "../components/AccountForm";
import { IStore } from "../reducers";

interface IStateProps {
  readAccountSuccess: IReadAccountSuccessPayload;
}

interface IDispatchProps {
  readAccount: () => void;
  saveAccount: (account: IAccount) => void;
}

interface IProps
  extends IStateProps,
    IDispatchProps,
    NavigationContainerProps {}

interface IState {
  account: IAccount;
}

class Container extends React.Component<IProps, IState> {
  static navigationOptions = {
    title: "アカウント設定"
  };

  public componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      this.props.readAccount();
    });
  }

  public render() {
    return (
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
        {this.props.readAccountSuccess != null ? (
          <AccountForm
            account={this.props.readAccountSuccess.account}
            onSubmit={this.handleSubmit}
          />
        ) : null}
      </View>
    );
  }

  private handleSubmit = (account: IAccount) => {
    this.props.saveAccount(account);
  };
}

export default connect(
  (state: IStore) => {
    return {
      readAccountSuccess: state.readAccount.success
    };
  },
  dispatch => {
    return {
      readAccount: () => dispatch(readAccount()),
      saveAccount: (account: IAccount) => dispatch(saveAccount({ account }))
    };
  }
)(Container);
