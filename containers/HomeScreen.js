import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function HomeScreen({ navigation }) {
  // const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  //Gestion des demi-étoiles
  // const displayStars = (ratingValue) => {
  //   let tab = [];
  //   const isDecimal = !Number.isInteger(ratingValue);
  //   const flooredNum = Math.floor(ratingValue);

  //   for (let i = 1; i <= 5; i++) {
  //     if (ratingValue >= i) {
  //       tab.push(<FontAwesome name="star" size={24} color="orange" key={i} />);
  //     }

  //     if (ratingValue < i && tab.length < 5) {
  //       tab.push(<FontAwesome name="star" size={24} color="grey" key={i} />);
  //     }

  //     if (flooredNum === i && isDecimal) {
  //       tab.push(
  //         <FontAwesome name="star-half-empty" size={24} color="black" />
  //       );
  //     }
  //   }

  //   return tab;
  // };

  return isLoading ? (
    <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RoomScreen", {
                    id: item._id,
                  });
                }}
                // style={styles.container}
              >
                <Image
                  source={{ uri: item.photos[0].url }}
                  style={styles.flatPic}
                  resireMode="contain"
                />

                <Text style={styles.price}>{item.price}€</Text>
              </TouchableOpacity>
              <View style={styles.subPic}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text>{item.reviews} reviews</Text>
                </View>

                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.hostPic}
                  resireMode="contain"
                />
              </View>
            </View>
          );
        }}
      />

      {/* <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      /> */}
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
    // width: Dimensions.get("window").width * 0.9,
  },
  flatPic: {
    height: 200,
    // width: Dimensions.get("window").width * 0.9,
    // marginTop: 10,
    // position: "relative",
  },
  hostPic: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
  },
  subPic: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    marginBottom: 25,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    paddingVertical: 8,
    // paddingRight: 60,
    // justifyContent: "space-between",
  },
  price: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 10,
    left: 0,
    color: "#fff",
    fontSize: 19,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
