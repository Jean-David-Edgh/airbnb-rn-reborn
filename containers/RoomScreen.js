import React from "react";
import { Text, View } from "react-native";
// import { useRoute } from "@react-navigation/core";

const RoomScreen = ({ route }) => {
  //   console.log(route);
  return (
    <View>
      <Text>Room Screen</Text>
      <Text>id = {route.params.id}</Text>
    </View>
  );
};

export default RoomScreen;

// const styles = StyleSheet.create({});
