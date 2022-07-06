import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getChoresByHouseholdId } from "../utils/api";
import ChoreCard from "./ChoreCard";
import { ScrollView } from "react-native-gesture-handler";

const Chores = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [householdChores, setHouseholdChores] = useState([]);

  useEffect(() => {
    getChoresByHouseholdId(currentUser).then((chores) => {
      setHouseholdChores(chores);
    });
  }, []);

  return (
      <ScrollView style={styles.back}>
      {householdChores.map((chore) => {
        return <ChoreCard chore={chore} householdChores={householdChores} setHouseholdChores={setHouseholdChores} key={chore.chore_id} />;
      })}
      </ScrollView> 
  );
};

export default Chores;

const styles = StyleSheet.create({
  back: {
    backgroundColor: "#2F5D62",
  }
});
