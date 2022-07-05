import { View, Text } from "react-native";
import React from "react";
import { Button, Card, Checkbox, List } from "react-native-paper";
import { patchChoreIsCompleted } from "../utils/api";

const ChoreCard = ({ chore }) => {
  const [checked, setChecked] = React.useState(chore.is_completed);

  const handleCheckbox = () => {
      patchChoreIsCompleted(chore.chore_id, checked);
      setChecked(!checked);
  };

  return (
    // <Card>
    //   <Card.Content>
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
        <Button mode="outlined" onPress={() => console.log("Pressed")}>
          Info
        </Button>
      )}
    />
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
