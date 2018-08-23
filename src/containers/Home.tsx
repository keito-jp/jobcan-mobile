import * as React from "react";
import { View } from "react-native";
import { NavigationContainerProps } from "react-navigation";
import { connect } from "react-redux";
import { Button, Text } from "native-base";
import { IReadStatusSuccessPayload, readStatus } from "../actions";
import { IStore } from "../reducers";

interface IStateProps {
  loading: boolean;
  readStatusSuccess: IReadStatusSuccessPayload;
}

interface IDispatchProps {
  readStatus: () => void;
}

interface IProps
  extends IStateProps,
    IDispatchProps,
    NavigationContainerProps {}

class Container extends React.Component<IProps, {}> {
  public componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      console.log("Foo!");
      this.props.readStatus();
    });
  }

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
        {this.props.readStatusSuccess != null ? (
          <Text
            style={{
              fontSize: 40,
              marginBottom: 20
            }}
          >
            {this.props.readStatusSuccess.response.status}
          </Text>
        ) : null}
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
        <Button
          full
          onPress={this.handleClickSettings}
          style={{ marginTop: 16 }}
        >
          <Text>アカウント設定</Text>
        </Button>
      </View>
    );
  }

  private handleClickSettings = () => {
    this.props.navigation.navigate("Settings");
  };

  private handleClick = () => {
    console.log(this.props.readStatusSuccess);
  };
}

export default connect(
  (state: IStore) => {
    return {
      loading: state.readStatus.loading,
      readStatusSuccess: state.readStatus.success
    };
  },
  dispatch => {
    return {
      readStatus: () => dispatch(readStatus())
    };
  }
)(Container);
