import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";
import { setDoc, doc } from "firebase/firestore";

const SetupProfile = ({ navigation }) => {
  //form user input data
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");

  //dropdown avatar items
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  //create document with current user uid
  const updateUser = () => {
    const user = auth.currentUser;
    setDoc(doc(db, "users", user.uid), {
      avatar_url: value,
      first_name: firstname,
      last_name: surname,
      email: user.email,
      username: username,
      household_id: "",
      points: 0,
      badges_achieved: "",
    }).then(() => {
      navigation.navigate("Setup Household");
    });
  };

  return (
    <KeyboardAvoidingView>
      <View>
        <TextInput
          placeholder="Please ENTER your FIRSTNAME"
          value={firstname}
          onChangeText={setFirstname}
        />

        <TextInput
          placeholder="Please ENTER your SURNAME"
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          placeholder="Please ENTER your USERNAME"
          value={username}
          onChangeText={setUsername}
        />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Button title="Create Profile" onPress={updateUser} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SetupProfile;

const styles = StyleSheet.create({});
