import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const user = auth.currentUser;
  // console.log(user);

  const [userInformation, setUserInformation] = useState([]);

  //   console.log(userInformation);

  return (
    <View>
      <Text>`Hello {user.uid}`</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
