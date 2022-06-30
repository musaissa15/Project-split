import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TextInput} from "react-native";
import React from "react";
import {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";

const Addchore = () => {
  const [choreName, setChoreName] = useState('')
  const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Daily", value: "daily" },
		{ label: "Weekly", value: "weekly" },
		{ label: "Monthly", value: "monthly" },
	]);


  const postchore = () => {

  }
  
  return (
		<KeyboardAvoidingView>
			<View>
				<TextInput
					placeholder="Add you chore "
					value={choreName}
					onChangeText={setChoreName}
				/>
				<DropDownPicker
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
				/>
				<Button title="Add" onPress={postchore} />
			</View>
		</KeyboardAvoidingView>
	);
};

export default Addchore;

const styles = StyleSheet.create({});
