import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import MyTabs from "./src/screens/NavBar";
import Chores from "./src/screens/Chores";
import Registration from "./src/screens/Registration";
import SetupProfile from "./src/screens/SetupProfile";
import Login from "./src/screens/Login";
import SetupHousehold from "./src/screens/SetupHousehold";
import { useEffect } from "react/cjs/react.production.min";
import { auth } from "./firebase-config";

const Stack = createNativeStackNavigator();

export default function App() {
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#00061A" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={globalScreenOptions}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={Registration} />
        <Stack.Screen name="App" component={MyTabs} />
        <Stack.Screen name="Setup" component={SetupProfile} />
        <Stack.Screen name="Setup Household" component={SetupHousehold} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
