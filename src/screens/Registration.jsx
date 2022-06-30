import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { StatusBar } from "expo-status-bar";

const Registration = ({ navigation }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(() => {
        navigation.navigate("Setup");
      })
      .catch((err) => {
        alert(err.code);
        console.dir(err);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.titleContainer}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email..."
          value={registerEmail}
          style={styles.input}
          onChangeText={setRegisterEmail}
        />
        <TextInput
          secureTextEntry
          placeholder="password..."
          value={registerPassword}
          style={styles.input}
          onChangeText={setRegisterPassword}
        />
        <Button
          containerStyle={styles.button}
          title="Register"
          onPress={register}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
  titleContainer: {
    fontStyle: "italic",
    fontSize: 40,
    marginBottom: 50,
  },

  input: {},
});
