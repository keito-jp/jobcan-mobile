import * as React from "react";
import { View } from "react-native";
import {
  NavigationContainerProps,
  NavigationScreenConfig
} from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, Text, Spinner } from "native-base";
import { punchIn, readStatus } from "../actions";
import { IStore } from "../reducers";

interface IStateProps {
  loadingStatus: boolean;
  loadingPunchIn: boolean;
  status: string;
}

interface IDispatchProps {
  readStatus: () => void;
  punchIn: () => void;
}

interface IProps
  extends IStateProps,
    IDispatchProps,
    NavigationContainerProps {}

class Container extends React.Component<IProps, {}> {
  static navigationOptions = (config: NavigationScreenConfig<any>) => {
    return {
      title: "ジョブカン勤怠",
      headerRight: (
        <Icon
          name="settings"
          onPress={() => config.navigation.navigate("Settings")}
          style={{ paddingRight: 10 }}
        />
      )
    };
  };

  public componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
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
        {this.props.loadingStatus ? (
          <Spinner color="blue" />
        ) : this.props.status != null ? (
          <Text
            style={{
              fontSize: 40,
              marginBottom: 20
            }}
          >
            {this.props.status}
          </Text>
        ) : null}
        <Text
          style={{
            marginBottom: 10
          }}
        >
          ジョブカンの打刻ができるかっこいいアプリ
        </Text>
        {this.props.loadingPunchIn ? (
          <Spinner color="blue" />
        ) : (
          <Button full onPress={this.handleClick}>
            <Text>打刻</Text>
          </Button>
        )}
      </View>
    );
  }

  private handleClickSettings = () => {
    this.props.navigation.navigate("Settings");
  };

  private handleClick = () => {
    this.props.punchIn();
  };
}

export default connect(
  (state: IStore) => {
    return {
      loadingStatus: state.readStatus.loading,
      loadingPunchIn: state.punchIn.loading,
      status: state.globalStatus.status
    };
  },
  dispatch => {
    return {
      readStatus: () => dispatch(readStatus()),
      punchIn: () => dispatch(punchIn())
    };
  }
)(Container);
