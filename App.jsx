import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import MyTabs from "./src/screens/NavBar";
import Chores from "./src/screens/Chores";
import Registration from "./src/screens/Registration";
import SetupProfile from "./src/screens/SetupProfile";
import Login from "./src/screens/Login";
import CurrentUserContext from "./src/contexts/CurrentUserContext";
import SetupHousehold from "./src/screens/SetupHousehold";

const Stack = createNativeStackNavigator();

export default function App() {
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#00061A" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <CurrentUserContext.Provider value={currentUser}>
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
      </CurrentUserContext.Provider>
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
