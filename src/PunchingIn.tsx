import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Button, Text } from "native-base";
import {
  IAccount,
  readStatus
} from "./actions";

interface IStateProps {
  loading: boolean;
}

interface IDispatchProps {
  readStatus: (account: IAccount) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

class Container extends React.Component<IProps, {}> {
  public render() {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 40
        }}
      >
        <Text
          style={{
            fontSize: 40,
            marginBottom: 20
          }}
        >
          Working
        </Text>
        <Text
          style={{
            marginBottom: 10
          }}
        >
          ジョブカンの打刻ができる最高にかっこいいアプリ
        </Text>
        <Button full onPress={this.handleClick}>
          <Text>打刻</Text>
        </Button>
        <Text>{this.props.loading}</Text>
      </View>
    );
  }

  private handleClick = () => {
    console.log(this.props.loading);
    this.props.readStatus({
      cliend_id: "Syoya,inc.",
      email: "kate@syoya.com",
      password: "oE81Npiv8n4oiy4DwHPDZR2IFXxEmY"
    });
  };
}

export default connect(
  (store: any) => {
    return {
      loading: store.readStatus.loading,
    };
  },
  dispatch => {
    return {
      readStatus: (account: IAccount) => dispatch(readStatus({account}))
    };
  }
)(Container);
