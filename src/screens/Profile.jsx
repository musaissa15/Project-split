import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Text,
  Title,
  Caption,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getBadges, getUserDataById } from "../utils/api";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
const { width } = Dimensions.get("screen");

const Profile = ({ navigation }) => {
  const [mode, setMode] = useState(false);
  const [user, setUser] = useState({});
  const [userBadges, setUserBadges] = useState([]);

  const userData = useContext(CurrentUserContext);
  useEffect(() => {
    getUserDataById(userData.uid).then((res) => {
      setUser(res);
    });
  }, []);

  useEffect(() => {
    if (user.badges_achieved) {
      const badge = user.badges_achieved;
      // console.log(badge);

      badge.forEach((b) => {
        getBadges(b).then((res) => {
          setUserBadges((curr) => {
            return [...curr, res];
          });
        });
      });
    }
  }, [user]);

  const ListOptions = () => {
    const optionsList = [{ title: "Your Badges" }];

    return (
      <View style={styles.optionListContainer}>
        {optionsList.map((option, index) => (
          <View style={styles.optionsCard} key={index}>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {option.title}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.userInfoSection}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: user.avatar_url,
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              Welcome {user.username}
            </Title>
            <Caption style={styles.caption}>{user.email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View styles={styles.row}>
          <Icon name="medal" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {user.badges_achieved}
          </Text>
        </View>

        <View styles={styles.row}>
          <Icon name="home-account" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {user.household_id}
          </Text>
        </View>

        <View styles={styles.row}>
          <Icon name="trophy" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {user.points}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>#1</Title>
          <Caption>{user.household_id}</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{user.points}</Title>
          <Caption>Points</Caption>
        </View>
      </View>

      <View style={styles.listWrapper}>
        <Text>My badges:</Text>
        {userBadges.map((badge) => {
          return (
            <View key={badge.name}>
              <Avatar.Image
                source={{
                  uri: badge.img_url,
                }}
                size={80}
              />
            </View>
          );
        })}

        <ListOptions />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },

  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  listWrapper: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  listItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  optionsCard: {
    height: 150,
    // width:  - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    // paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
