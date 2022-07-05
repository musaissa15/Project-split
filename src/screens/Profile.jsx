
import { StyleSheet, View, SafeAreaView, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
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
import { LinearGradient } from 'expo-linear-gradient';



const Profile = ({navigation}) => {
  const [mode, setMode] = useState(false);
  const [user, setUser] = useState({});

  const userData = useContext(CurrentUserContext);
  useEffect(() => {
    getUserDataById(userData.uid).then((res) => {
      setUser(res);
    });
  }, []);



  return (
    <SafeAreaView>
        <ScrollView>
    <View style={styles.bg_colour}>
      <TouchableOpacity>
        <View></View>
      </TouchableOpacity>
    </View>
    <View style={{alignItems: "center"}}>

    {/* <Image source={require("../../assets/earth.jpeg")}
        style={styles.circle_radius}></Image> */}

{/* <Image
            source={{
            uri: user.avatar_url,}}
            // size={80}
            style={styles.circle_radius}
            /> */}

 <Image source={{
            uri: user.avatar_url,}}
            style={styles.circle_radius}></Image> 

        <Text style={styles.username_title}>Welcome {user.username}</Text>
        <Text style={styles.username_subtitle}>{user.email}</Text>
    </View>

    {/* <View style={{alignItems: "center"}}>
    <Text style={styles.username_title}>badges</Text>
    </View> */}
    <View style={{
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
        marginTop:20,
        height: 50,
        }}>
        <Text style={{marginTop: 20,   alignSelf: "center", 
        flexDirection: "row", 
        justifyContent: "center",}}> Your Household ID: {user.household_id}</Text>
    </View>

    
    <View style={{
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
        marginTop:20,
        height: 50,
        }}>

        <Text style={{marginTop: 20,   alignSelf: "center", 
        flexDirection: "row", 
        justifyContent: "center",}}> Overall points: {user.points}</Text>
    </View>

    <View style={{
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
        marginTop:20,
        height: 100,
        }}>
        <Text style={{marginTop: 20,   alignSelf: "center", 
        flexDirection: "row", 
        justifyContent: "center",}}> Badges Achieved: {user.badges_achieved}</Text>
    </View>


    <View style={{
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
        marginTop:60,
        height: 250,
        }}>
<Text>Your upcoming chores</Text>
    </View>


    </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    bg_colour: {
        padding:10,width:"100%", 
        backgroundColor:"#2F5D62", 
        height:250
    },
    circle_radius: {
        width:140, 
        height:140, 
        borderRadius: 100, 
        marginTop:-70,
},
 username_title: {
    fontSize:25, 
    fontWeight: "bold", 
    padding:10,
   },

   username_subtitle: {
    fontSize:20, 
    padding:10,
   },




})