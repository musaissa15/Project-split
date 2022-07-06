import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { patchUserWithHouseholdId, postHousehold } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

const SetupHousehold = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [householdName, setHouseholdName] = useState("");
  const [householdId, setHouseholdId] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const handlePressCreate = () => {
    setShowForm(true);
  };

  const handlePressJoin = () => {
    setShowJoinForm(true);
  };

  const userId = currentUser ? currentUser.uid : null;

  const handleSubmit = () => {
    postHousehold(userId, householdName).then(() => {
      navigation.navigate("App");
    });
  };

  const handleSubmitJoin = () => {
    patchUserWithHouseholdId(userId, householdId).then(() => {
      navigation.navigate("App");
    });
  };

  return (
    <KeyboardAvoidingView>
      <Pressable
        style={styles.createHouseholdButton}
        onPress={handlePressCreate}
      >
        <Text>Create a household</Text>
      </Pressable>

      {!showForm ? null : (
        <SafeAreaView style={styles.createContainer}>
          <TextInput
            placeholder="Household name"
            value={householdName}
            onChangeText={setHouseholdName}
          />
          <Pressable onPress={handleSubmit} style={styles.createSubmitButton}>
            <Text>Create</Text>
          </Pressable>
        </SafeAreaView>
      )}

      <Pressable style={styles.joinHouseholdButton} onPress={handlePressJoin}>
        <Text>Join a household</Text>
      </Pressable>
      {!showJoinForm ? null : (
        <SafeAreaView style={styles.joinContainer}>
          <TextInput
            placeholder="Household key"
            value={householdId}
            onChangeText={setHouseholdId}
          />
          <Pressable onPress={handleSubmitJoin} style={styles.joinSubmitButton}>
            <Text>Join</Text>
          </Pressable>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};

export default SetupHousehold;

const styles = StyleSheet.create({
  createHouseholdButton: {
    backgroundColor: "blue",
    position: "absolute",
    left: 80,
    top: 200,
    borderColor: "#009387",
    borderWidth: 1,
  },
  joinHouseholdButton: {
    backgroundColor: "green",
    position: "absolute",
    left: 90,
    top: 250,
    borderColor: "#009387",
    borderWidth: 1,
  },
  joinContainer: {
    backgroundColor: "yellow",
    position: "absolute",
    left: 70,
    top: 350,
    borderColor: "#009387",
    borderWidth: 1,
  },
  joinSubmitButton: {
    backgroundColor: "grey",
  },

  createSubmitButton: {
    backgroundColor: "grey",
  },

  createContainer: {
    backgroundColor: "pink",
    left: 50,
    top: 400,
    display: "flex",
  },
});
