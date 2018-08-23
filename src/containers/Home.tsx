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
  loading: boolean;
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
        <Text
          style={{
            fontSize: 40,
            marginBottom: 20
          }}
        >
          {this.props.status != null ? this.props.status : ""}
        </Text>
        <Button
          full
          onPress={this.handlePressPunchIn}
          disabled={this.props.loading || this.props.status == null}
        >
          {this.props.loading ? <Spinner color="white" /> : <Text>打刻</Text>}
        </Button>
      </View>
    );
  }

  private handlePressPunchIn = () => {
    this.props.punchIn();
  };
}

export default connect(
  (state: IStore) => {
    return {
      loading: state.readStatus.loading || state.punchIn.loading,
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
