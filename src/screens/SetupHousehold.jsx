import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase-config'

const SetupHousehold = ({ navigation }) => {
	const [showForm, setShowForm] = useState(false)
	const [showJoinForm, setShowJoinForm] = useState(false)
	const [householdName, setHouseholdName] = useState('')
	const [householdId, setHouseholdId] = useState('')
    
	const handlePressCreate = () => {
		setShowForm(true)
	}

	const handlePressJoin = () => {
		setShowJoinForm(true)
	}
    
	
	const handleSubmit = () => {
		const user = auth.currentUser;
        const userId = user ? user.uid : null;
        const userRef = user ? doc(db, 'users', userId) : null;

		const newHouseholdRef = addDoc(collection(db, 'households'), {'household_name': householdName})
		
		newHouseholdRef.then((household) => {
			if(user) {			
				return updateDoc(userRef, { household_id: household.id})
			}
		}).then(() => {
			navigation.navigate("App");
		})	
	}

	const handleSubmitJoin = () => {
		const user = auth.currentUser;
        const userId = user ? user.uid : null;
        const userRef = user ? doc(db, 'users', userId) : null;
		const householdRef = doc(db, 'households', householdId)
		
		getDoc(householdRef).then((householdSnap) => {
			if(user && householdSnap.exists()) {		
				updateDoc(userRef, { household_id: householdId})
					.then(() => {
						navigation.navigate("App");
						})
					}
		})
	}
	
  return (
    <View>
      <Button 
				title="Create a household"
        onPress={handlePressCreate}
      />
			{!showForm ? null : 
				<SafeAreaView>
					<TextInput 
						placeholder='Household name'
						value={householdName}
						onChangeText={setHouseholdName}
					/>	
					<Button 
						title='Create'
						onPress={handleSubmit}
					/>	
				</SafeAreaView>
			}
		<Button 
				title="Join a household"
        onPress={handlePressJoin}
      />
			{!showJoinForm ? null : 
				<SafeAreaView>
					<TextInput 
						placeholder='Household key'
						value={householdId}
						onChangeText={setHouseholdId}
					/>	
					<Button 
						title='Join'
						onPress={handleSubmitJoin}
					/>	
				</SafeAreaView>
			}
    </View>
  )
}

export default SetupHousehold

const styles = StyleSheet.create({})
