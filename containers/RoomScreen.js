import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RoomScreen = ({ route }) => {
  console.log(route);
  return (
    <View>
      <Text>Room Screen</Text>
      <Text>id = {route.params.id}</Text>
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({});
