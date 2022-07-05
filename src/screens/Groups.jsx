import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getUsersByHousehold } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Groups = () => {
  const currentUser = useContext(CurrentUserContext);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsersByHousehold(currentUser).then((users) => {
      setUsersData(users);
    });
  }, []);

  return (
    <View style={styles.userInfoSection}>
      <Text>Here are the people in your house:</Text>
      {usersData.map((user) => {
        return (
          <View>
            <View style={styles.userInfoSection}></View>
            <Text>Username: {user.username}</Text>
            <Text>Avatar: {user.avatar_url}</Text>
            <Text>Badges: {user.badges_achieved}</Text>
            <Text>Points: {user.points}</Text>
            <View style={styles.userInfoSection}></View>
          </View>
        );
      })}
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
});
