import {
  Pressable,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase-config";

function Registration({ navigation }) {
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
          placeholder="Email"
          value={registerEmail}
          style={styles.input}
          onChangeText={setRegisterEmail}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={registerPassword}
          style={styles.input}
          onChangeText={setRegisterPassword}
        />
        <Pressable style={styles.button} onPress={register}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  titleContainer: {
    fontStyle: "italic",
    fontSize: 40,
    marginBottom: 50,
  },
  input: {
    width: 300,
    backgroundColor: "#ecf0f1",
    padding: 20,
    alignItems: "center",
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
