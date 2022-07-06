import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import { getBadges, getHouseholdbyUser, getUserDataById } from "../utils/api";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
const { width } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";

const Profile = ({ navigation }) => {
  const [mode, setMode] = useState(false);
  const [user, setUser] = useState({});
  const [household, setHousehold] = useState({});
  const [userBadges, setUserBadges] = useState([]);

  const userData = useContext(CurrentUserContext);
  useEffect(() => {
    getUserDataById(userData.uid).then((res) => {
      setUser(res);
    });
    getHouseholdbyUser(userData.uid).then((res) => {
      setHousehold(res);
    });
  }, []);

  //grabbing users badges from firestore
  useEffect(() => {
    if (user.badges_achieved) {
      const badge = user.badges_achieved;
      console.log(badge);

      badge.forEach((b) => {
        getBadges(b).then((res) => {
          setUserBadges((curr) => {
            return [...curr, res];
          });
        });
      });
    }
  }, [user]);
  console.log(userBadges);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.bg_colour}>
          <Text style={styles.username_title}>Welcome {user.username}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: user.avatar_url,
            }}
            style={styles.circle_radius}
          ></Image>
        </View>
        <View style={styles.infoCard}>
          <Text styles={styles.subtitle}>House</Text>
        </View>
        <View style={styles.infoCard}>
          <Text styles={styles.subtitle}>Overall points: {user.points}</Text>
        </View>
        {/* this is displaying the current users badges */}
        <View style={styles.infoCard}>
          <Text styles={styles.subtitle}>My badges:</Text>
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
        </View>
        <View style={styles.infoCard}>
          <Text styles={styles.subtitle}>Your upcoming chores</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  bg_colour: {
    padding: 10,
    width: "100%",
    backgroundColor: "#2F5D62",
    height: 150,
    alignItems: "center",
  },
  circle_radius: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: -70,
    resizeMode: "contain",
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "white",
    overflow: "hidden",
  },
  username_title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    marginTop: 20,
    color: "white",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F5D62",
    paddingBottom: 10,
  },
  infoCard: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
  },
});
