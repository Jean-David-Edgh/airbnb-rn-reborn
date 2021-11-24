import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Text>En cours de chargement...</Text>
  ) : (
    <View style={styles.homeContainer}>
      <Image
        source={require("../assets/logo-airbnb-2.jpg")}
        style={styles.logo}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                source={{ uri: item.photos[0].url }}
                style={styles.flatPic}
                resireMode="contain"
              />
              <View style={styles.subPic}>
                <View>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text>{item.reviews} reviews</Text>
                </View>
                <View>
                  <Image
                    source={{ uri: item.user.account.photo.url }}
                    style={styles.hostPic}
                    resireMode="contain"
                  />
                </View>
              </View>
            </View>
          );
        }}
      />

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  homeContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  flatPic: {
    width: Dimensions.get("window").width,
    height: 200,
    marginTop: 10,
  },
  hostPic: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
  },
  subPic: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    paddingRight: 60,
    justifyContent: "space-between",
  },
});
