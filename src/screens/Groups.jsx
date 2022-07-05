import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getBadges, getUsersByHousehold } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Avatar } from "react-native-paper";

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
          <View key={user.username}>
            <View style={styles.userInfoSection}></View>
            <Text>Username: {user.username}</Text>
            <Avatar.Image
              source={{
                uri: user.avatar_url,
              }}
              size={80}
            />
            <Text>Badges: {user.badges_achieved}</Text>
            <Text>Points: {user.points}</Text>
            <View style={styles.userInfoSection}></View>
          </View>
        );
      })}
      <Text>Here are the chores in your household:</Text>
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
