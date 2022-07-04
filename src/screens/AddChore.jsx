import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StatusBar } from "expo-status-bar";
// import DatePicker from "../components/DatePicker"
import { Button } from "react-native-web";
import {postChore} from "../utils/api";

const Addchore = () => {
  const [choreName, setChoreName] = useState("");
  const [choreDescription, setChoreDescription] = useState("")
  const [open, setOpen] = useState(false);
  const [openDifficulty, setOpenDifficulty] = useState(false)
  const [value, setValue] = useState(null);
  const [difficultyValue, setDifficultyValue] = useState(false)
  const [day, setDay] = useState('')
   const [month, setMonth] = useState('');
  const [items, setItems] = useState([
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ]);
  const [difficulty, setDifficulty] = useState([
		{ label: "1", value: 1 },
		{ label: "2", value: 2 },
		{ label: "3", value: 3 },
		{ label: "4", value: 4 },
		{ label: "5", value: 5 },
	]);

  

  const addChore = () => {
    postChore("6b4fR5AjYiTTWXmpxiHGOISOUuv2", {
			choreName,
			choreDescription,
			difficulty: difficultyValue,
			day,
			month,
			usersAssigned: ["6b4fR5AjYiTTWXmpxiHGOISOUuv2"],
    }).then(() => {
      console.log("result")
    })
  };
  

  return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.inputContainer}>
				<Text style={styles.titleContainer}>What needs doing?!</Text>
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

				{
					//TODOS make input fields for the day and month and year(year wont be displayed)
					//TODOS set the state for the day and the month the ch
					//TODOS
				}

				<DropDownPicker
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
				/>

				<DropDownPicker
					open={openDifficulty}
					value={difficultyValue}
					items={difficulty}
					setOpen={setOpenDifficulty}
					setValue={setDifficultyValue}
					setItems={setDifficulty}
				/>
				<Pressable style={styles.button} onPress={addChore}>
					<Text style={styles.text}>Add</Text>
				</Pressable>
			</View>
		</KeyboardAvoidingView>
	);
};

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
});
