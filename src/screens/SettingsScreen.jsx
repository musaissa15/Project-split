import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import  Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SettingsScreen = ({ navigation }) => {
 

  return (
    <View>
  
      <TouchableRipple onPress={() => {}}>
      <View style={styles.listItem}>
    <Icon name="logout" color="#777777" size={25}/>
    <Text style={styles.listItemText}>Sign out</Text>
    </View>


      </TouchableRipple>


    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      listItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      },

})