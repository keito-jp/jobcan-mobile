import * as  React from "react";
import {View} from "react-native";
import {
  Body,
  Button,
  Container,
  Header,
  Text,
  Title,
} from "native-base";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>ジョブカン</Title>
          </Body>
        </Header>
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
          >Working</Text>
          <Text
            style={{
              marginBottom: 10
            }}
          >ジョブカンの打刻ができる最高にかっこいいアプリ</Text>
          <Button full><Text>打刻</Text></Button>
        </View>
      </Container>
    );
  }
}
