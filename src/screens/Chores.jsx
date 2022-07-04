import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getChoresByHouseholdId } from "../utils/api";
import { List } from "react-native-paper";
import ChoreCard from "./ChoreCard";

const Chores = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [householdChores, setHouseholdChores] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    getChoresByHouseholdId(currentUser).then((chores) => {
      setHouseholdChores(chores);
    });
  }, []);

  return (
    <View>
      {householdChores.map((chore) => {
        console.log(chore);
        return <ChoreCard chore={chore} key={chore.chore_name}/>
      })}
    </View>
  );
};

export default Chores;

const styles = StyleSheet.create({});
