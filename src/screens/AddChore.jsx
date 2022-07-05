import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StatusBar } from "expo-status-bar";
import { postChore, getUsersByHousehold } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Addchore = () => {
  const [choreName, setChoreName] = useState("");
  const [choreDescription, setChoreDescription] = useState("");
  const [openDifficulty, setOpenDifficulty] = useState(false);

  const [difficultyValue, setDifficultyValue] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [difficulty, setDifficulty] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ]);
  const [assignUserOpen, setAssignUserOpen] = useState(false);
  const [assignUserOptions, setAssignUserOptions] = useState([]);
  const [assignUser, setAssignUser] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    getUsersByHousehold(currentUser).then((users) => {
      setAssignUserOptions(
        users.map((user) => {
          return { label: user.username, value: user.username };
        })
      );
    });
  }, []);

  const addChore = () => {
    postChore("6b4fR5AjYiTTWXmpxiHGOISOUuv2", {
      choreName,
      choreDescription,
      difficulty: difficultyValue,
      day,
      month,
      userAssigned: assignUser,
    })
      .then(() => {
        setChoreName("");
        setChoreDescription("");
        setMonth("");
        setDay("");
        alert("Your chore has been added");
      })
      .catch(() => {
        alert("Sorry something went wrong.Please try again ");
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <Text style={styles.titleContainer}>What needs doing?!</Text>
        <View style={styles.allInput}>
          <TextInput
            style={styles.input}
            placeholder="Chore Name "
            value={choreName}
            onChangeText={setChoreName}
          />

          <TextInput
            style={styles.input}
            placeholder="Chore Description"
            value={choreDescription}
            onChangeText={setChoreDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Day"
            value={day}
            onChangeText={setDay}
            maxLength={2}
            keyboardType={"number-pad"}
          />

          <TextInput
            style={styles.input}
            placeholder="Month"
            value={month}
            onChangeText={setMonth}
            maxLength={2}
            keyboardType={"number-pad"}
          />
        </View>

        <View style={styles.difficultyDropdown}>
          <Text style={styles.difficultyFont}>Difficulty:</Text>
				  <DropDownPicker
					  placeholder="Select difficulty"
            open={openDifficulty}
            value={difficultyValue}
            items={difficulty}
            setOpen={setOpenDifficulty}
            setValue={setDifficultyValue}
            setItems={setDifficulty}
          />

				  <DropDownPicker
					  placeholder="Select user to assign"
            open={assignUserOpen}
            value={assignUser}
            items={assignUserOptions}
            setOpen={setAssignUserOpen}
            setValue={setAssignUser}
            setItems={setAssignUserOptions}
          />
        </View>
        <Pressable style={styles.button} onPress={addChore}>
          <Text style={styles.text}>Add</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

//TODOS when user posts a chore, if the chore has been posted it should indicate it to the user

export default Addchore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    width: 300,
    backgroundColor: "#ecf0f1",
    padding: 20,
    alignItems: "center",
    fontSize: 20,
    borderWidth: "thin",
    borderStyle: "double",
  },
  inputContainer: {
    width: 300,
  },
  titleContainer: {
    fontStyle: "italic",
    fontSize: 40,
    marginBottom: 50,
  },
  registerMessage: {
    marginTop: 20,
    marginBottom: -10,
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
  difficultyDropdown: {
    fontSize: 16,
    // left: 80,
    border: "none",
    cursor: "pointer",
    alignSelf: "center",
    alignItems: "flex-start",
    alignSelf: "baseline",
    margin: "20px",
  },
  difficultyFont: {
    fontSize: "large",
  },
});
