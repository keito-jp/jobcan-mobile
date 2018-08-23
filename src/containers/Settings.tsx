import { Content } from "native-base";
import * as React from "react";
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

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  account: IAccount;
}

class Container extends React.Component<IProps, IState> {
  public componentDidMount() {
    this.props.readAccount();
  }

  public render() {
    return (
      <Content>
        {this.props.readAccountSuccess != null ? (
          <AccountForm
            account={this.props.readAccountSuccess.account}
            onSubmit={this.handleSubmit}
          />
        ) : null}
      </Content>
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
