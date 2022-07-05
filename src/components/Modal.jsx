import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { deleteChore } from "../utils/api";

const ChoreModal = ({ modalVisible, setModalVisible, chore }) => {
  const dueDate = chore.due_date.toDate().toDateString();

  const handleDelete = () => {
    //modal - are you sure you want to delete?
    //if yes - deletechore
      //
    //if no - return

    deleteChore(chore.chore_id)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{chore.chore_name}</Text>
            <Text style={styles.modalText}>{chore.description}</Text>
            <Text style={styles.modalText}>
              {chore.users_assigned.map((user) => user)}
            </Text>
            <Text style={styles.modalText}>Due on {dueDate}</Text>
            <Text style={styles.modalText}>{chore.difficulty} points</Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleDelete}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                // onPress={() => deleteChore()}
              >
                <Text style={styles.textStyle}>Swap</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2F5D62",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ChoreModal;
