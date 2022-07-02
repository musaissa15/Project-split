import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import Profile from "./Profile";
import Groups from "./Groups";
import Chores from "./Chores";
import AddChore from "./AddChore";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: "#E91E63",
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: "Groups",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Chores"
        component={Chores}
        options={{
          tabBarLabel: "Chores",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Chore"
        component={AddChore}
        options={{
          tabBarLabel: "Add Chore",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="add-to-list" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({});
