import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { deleteChore } from "../utils/api";

const DeleteModal = ({ modalDeleteVisible, setModalDeleteVisible, chore }) => {

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
        visible={modalDeleteVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalDeleteVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Are you sure you want to delete this chore?</Text>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleDelete}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalDeleteVisible(!modalDeleteVisible)}}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};