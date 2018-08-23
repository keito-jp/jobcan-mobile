import { Button, Form, Input, Item, Text } from "native-base";
import * as React from "react";

import { IAccount } from "../actions";

interface IProps {
  account: IAccount;
  onSubmit: (account: IAccount) => void;
}

interface IState {
  account: IAccount;
}

export default class AccountForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      account: props.account != null ? props.account : ({} as IAccount)
    };
  }

  public render() {
    return (
      <Form>
        <Item>
          <Input
            placeholder="勤怠会社ID"
            value={this.state.account.client_id}
            onChangeText={this.handleChangeClientID}
          />
        </Item>
        <Item>
          <Input
            placeholder="メールアドレス"
            value={this.state.account.email}
            onChangeText={this.handleChangeEmail}
          />
        </Item>
        <Item>
          <Input
            placeholder="パスワード"
            textContentType="password"
            value={this.state.account.password}
            onChangeText={this.handleChangePassword}
            secureTextEntry
          />
        </Item>
        <Button full onPress={this.handlePressSave}>
          <Text>保存</Text>
        </Button>
      </Form>
    );
  }

  private handleChangeClientID = (text: string) => {
    const { account } = Object.assign({}, this.state);
    account.client_id = text;
    this.setState({ account });
  };

  private handleChangeEmail = (text: string) => {
    const { account } = Object.assign({}, this.state);
    account.email = text;
    this.setState({ account });
  };

  private handleChangePassword = (text: string) => {
    const { account } = Object.assign({}, this.state);
    account.password = text;
    this.setState({ account });
  };

  private handlePressSave = async () => {
    this.props.onSubmit(this.state.account);
  };
}
