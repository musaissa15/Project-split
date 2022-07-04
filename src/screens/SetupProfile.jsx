import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Pressable,
    KeyboardAvoidingView
  } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';


const SetupProfile = ({ navigation }) => {
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
  
    //dropdown avatar items
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: "Apple", value: "apple", },
      { label: "Banana", value: "banana" },
      { label: "Kiwi", value: "kiwi" },
      { label: "Citrus", value: "citrus" },
      { label: "Pear", value: "pear" },
      { label: "Peach", value: "peach" },
      { label: "Lemon", value: "lemon" },
      { label: "Pineapple", value: "pineapple" },
      { label: "Watermelon", value: "watermelon" },
      { label: "Melon", value: "melon" },
      { label: "Strawberry", value: "strawberry" },
      { label: "Grape", value: "grape" },
      { label: "Blueberry", value: "blueberry" },
      { label: "Blackberry", value: "blackberry" },
      { label: "Avacado", value: "avacado" },
      { label: "Cherry", value: "cherry" },

    ]);


 //create document with current user uid
 const updateUser = () => {
    const user = auth.currentUser;
    setDoc(doc(db, "users", user.uid), {
      avatar_url: value,
      first_name: firstname,
      last_name: surname,
      email: user.email,
      username: username,
      household_id: "",
      points: 0,
      badges_achieved: "",
    }).then(() => {
      navigation.navigate("Setup Household");
    });
  };


  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView>
<LinearGradient colors={["#22577E", "#01ab9d"]} 
      style={styles.container}>
   <View style={styles.header}>
      <Text style={styles.text_header}>Set up your Profile</Text>
    </View>


<View style={styles.footer}>

<Text style={styles.text_footer}>FIRSTNAME </Text>
      <View style={styles.action}>
      <FontAwesome 
      name="user-o"
      color={colors.text}
      size={20}
      />
      <TextInput
          style={styles.textInput}
          placeholder="Please ENTER your FIRSTNAME"
          autoFocus
          autoCapitalize="none"
          value={firstname}
          onChangeText={setFirstname}
        />
        </View>

        <Text style={[styles.text_footer, {marginTop: 60}]}>SURNAME </Text>
      <View style={styles.action}>
      <FontAwesome 
      name="user"
      color={colors.text}
      size={20}
      />
    <TextInput
          style={styles.textInput}
          placeholder="Please ENTER your SURNAME"
          autoFocus
          autoCapitalize="none"
          value={surname}
          onChangeText={setSurname}
        />
        </View>




    <Text style={[styles.text_footer, {marginTop: 60}]}>USERNAME</Text>
      <View style={styles.action}>
      <FontAwesome 
      name="id-badge"
      color={colors.text}
      size={20}
      />
    <TextInput
          style={styles.textInput}
          placeholder="Please ENTER your USERNAME"
          autoFocus
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        </View>

        <Text style={[styles.text_footer, {marginTop: 60}]}>SELECT A PROFILE PHOTO</Text>
      <View style={styles.action}>
  
   <DropDownPicker
          style={styles.textInput}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropdownTextStyles={{color: "pink"}}
        />
        </View>



<View style={styles.button}></View>




<LinearGradient
colors={["#22577E", "#01ab9d"]}
style={styles.signIn}>
    <TouchableOpacity
    onPress={updateUser}>


  <Text style={[styles.textSign, {
    color: '#fff'
  }]}
  >Create Profile</Text>
   </TouchableOpacity>
  </LinearGradient>






</View>
</LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default SetupProfile

const styles = StyleSheet.create({
    container: {
        flex: 1, 
          
      },
      header: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 50,
          
      },
      footer: {
          flex: 3,
          backgroundColor: '#DFEEEA',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      text_header: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 50,
          fontFamily: "Poppins",
      },
      text_footer: {
          color: '#05375a',
          fontSize: 18
      },
      action: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 5
      },
      actionError: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#FF0000',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : -12,
          paddingLeft: 10,
          color: '#05375a',
      },
      errorMsg: {
          color: '#FF0000',
          fontSize: 14,
      },
      button: {
        alignItems: 'center',
        marginTop: 300
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: 'center',
    },
 
    


})
