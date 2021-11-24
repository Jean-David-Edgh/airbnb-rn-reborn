import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    //Tous les champs sont-ils remplis ?
    if (email && username && password && confirmPassword && description) {
      setError("");
      // MDP = confirm MDP ?
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              password: password,
              description: description,
              username: username,
            }
          );
          console.log(response.data);

          //Fixe le user token
          setToken(response.data.token);
        } catch (error) {
          console.log(error.response.status);
          console.log(error.response.data);
          if (
            error.response.data.error ===
              "This username already has an account." ||
            error.response.data.error === "This email already has an account."
          ) {
            setError(error.response.data.error);
          }
        }
      } else {
        setError("Les 2 MDP ne sont pas identiques");
      }
    } else {
      setError("Remplir tous les champs");
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="Your Email"
          secureTextEntry={false}
        />
        <TextInput
          value={username}
          style={styles.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
          placeholder="Your username"
          secureTextEntry={false}
        />
        <TextInput
          value={password}
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="Your password"
          secureTextEntry={true}
        />
        <TextInput
          value={confirmPassword}
          style={styles.input}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          placeholder="Confirm your password"
          secureTextEntry={true}
        />
        <TextInput
          value={description}
          style={styles.input}
          onChangeText={(text) => {
            setDescription(text);
          }}
          placeholder="Your description"
          secureTextEntry={false}
        />
        <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginVertical: 25,
  },
  logo: {
    height: 100,
    width: 100,
  },
  input: {
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    height: 40,
    width: 300,
    marginTop: 40,
  },
  btn: {
    borderColor: "grey",
    borderWidth: 2,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
});
