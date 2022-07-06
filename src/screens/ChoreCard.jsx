import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, Card, Checkbox, List, Pressable } from "react-native-paper";
import { patchChoreIsCompleted } from "../utils/api";
import ChoreModal from "../components/Modal";
import { SafeAreaView } from "react-native-safe-area-context";
// import DeleteModal from "../components/DeleteModal";

const ChoreCard = ({ chore, householdChores, setHouseholdChores }) => {
  const [checked, setChecked] = React.useState(chore.is_completed);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleCheckbox = () => {
    patchChoreIsCompleted(chore.chore_id, checked);
    setChecked(!checked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChoreModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        chore={chore}
        householdChores={householdChores}
        setHouseholdChores={setHouseholdChores}
      />
      <Card style={styles.choreCard}>
        <Card.Content style={styles.cardContent}>
          <List.Item
            title={chore.chore_name}
            description={chore.description}
            left={(props) => (
              <View style={styles.checkbox}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={handleCheckbox}
                style={styles.checkbox}
              /></View>
            )}
            style={styles.list}
            right={(props) => (
              <View style={styles.buttonView}>
                <Button style={styles.button}onPress={() => setModalVisible(true)}>
                  <List.Icon
                    {...props}
                    icon="information"
                    style={styles.button}
                  />
                </Button>
              </View>
            )}
          />
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default ChoreCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    // marginTop: 16,
    alignItems: "center", 
    justifyContent: "center",
  },

  choreCard: {
    width: "100%", //p and m 0 - no difference
    
  },
  cardContent: {
     // paand m - no differencec
  },
  list: {
    padding: 0,
    margin: 0,
  },
  checkbox: {
    justifyContent: "space-around",
  },
  // info: {
  //   padding: 0,
  //   margin: 0,
  // },
  // button: {
  //   padding: 0,
  //   margin: 0,
  //   alignSelf: "right",
  // }
});
