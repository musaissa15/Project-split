import { View, Text } from "react-native";
import React from "react";
import { Pressable, Button, Card, Checkbox, List } from "react-native-paper";
import { patchChoreIsCompleted } from "../utils/api";
import ChoreModal from "../components/Modal";

const ChoreCard = ({ chore }) => {
  const [checked, setChecked] = React.useState(chore.is_completed);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleCheckbox = () => {
    patchChoreIsCompleted(chore.chore_id, checked);
    setChecked(!checked);
  };

  return (
    <View>
      <ChoreModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        chore={chore}
      />
      {/* <Card>
       <Card.Content> */}
      <List.Item
        title={chore.chore_name}
        description={chore.description}
        left={(props) => (
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={handleCheckbox}
          />
        )}
        right={(props) => (
          <Button mode="outlined" onPress={() => setModalVisible(true)}>
            Info
          </Button>
        )}
      />
    </View>
    //   </Card.Content>
    //   {/* <Card.Actions>
    //   <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    //   Press me
    // </Button>
    //   </Card.Actions> */}
    // </Card>
  );
};

export default ChoreCard;
