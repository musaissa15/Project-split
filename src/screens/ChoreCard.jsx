import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  Button,
  Card,
  Checkbox,
  List,
} from "react-native-paper";
import { patchChoreIsCompleted } from "../utils/api";
import ChoreModal from "../components/Modal";
import { SafeAreaView } from "react-native-safe-area-context";

const ChoreCard = ({ chore }) => {
  const [checked, setChecked] = React.useState(chore.is_completed);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleCheckbox = () => {
    patchChoreIsCompleted(chore.chore_id, checked);
    setChecked(!checked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.choreCard}>
        <ChoreModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          chore={chore}
        />
        <Card.Content style={styles.cardContent}>
          <List.Item
            title={chore.chore_name}
            description={chore.description}
            left={(props) => (
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={handleCheckbox}
                style={styles.checkbox}
              />
            )}
            right={(props) => (
              <Button
                style={styles.button}
                mode="outlined"
                onPress={() => setModalVisible(true)}
              >
                Info
              </Button>
            )}
            style={styles.list}
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
    marginTop: 16,
    alignItems: "center", // Centered horizontally
  },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.white,
  // },
  choreCard: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
  cardContent: {
  
  },
  list: {
    padding: 0,
    margin: 0,
  },
  checkbox: {
    height: 16,
  },
  button: {
    padding: 0,
    margin: 0,
  }
});
