import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const user = auth.currentUser;
  // console.log(user);

  const [userInformation, setUserInformation] = useState([]);

  // const docSnap = getDoc(doc(db, "users", user.uid)).then((user) => {
  //   return setUserInformation(user.data());
  // });

  //   console.log(userInformation);

  return (
    <View>
      <Text>`Hello {user.uid}`</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
