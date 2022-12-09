import * as React from 'react';
import { useState } from 'react';
import { Text, View, Modal, Alert, Pressable, TextInput } from 'react-native';
import { database, auth } from '../firebase';
import CalorieTrackerStyleSheet from '../stylesheets/CalorieTrackerStyleSheet';

export default function CalorieTracker({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(0);
  const [calories, onCalorieChange] = React.useState(0);

  // Get User
  const user = auth.currentUser.uid;
  const totalCalories = database.ref(`users/${user}/totalCalories`);

  totalCalories.get(
    'value',
    (snapshot) => {
      console.log(snapshot.val());
      onCalorieChange(snapshot.val());
    },
    function (error) {
      console.log(`Error: ${error.code}`);
    }
  );

  function updateCalories() {
    const userRef = database.ref(`users/${user}`);
    const newTotal = parseInt(number) + parseInt(calories);
    userRef.update({ totalCalories: newTotal });
    onCalorieChange(newTotal);
  }

  return (
    <View>
      <Text style={CalorieTrackerStyleSheet.header}>Total Calories Today</Text>
      <View style={CalorieTrackerStyleSheet.circle}>
        <Text>{calories} Calories</Text>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={CalorieTrackerStyleSheet.popupOverlay}>
          <View style={CalorieTrackerStyleSheet.modal}>
            <Text>Name</Text>
            <TextInput
              style={CalorieTrackerStyleSheet.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter Name of Item"
            />
            <Text>Calories</Text>
            <TextInput
              style={CalorieTrackerStyleSheet.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Enter Calories"
              keyboardType="numeric"
            />
            <Pressable
              style={CalorieTrackerStyleSheet.modalCloseButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                updateCalories();
              }}
            >
              <Text>Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={CalorieTrackerStyleSheet.modalOpenButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={CalorieTrackerStyleSheet.text}>Add Calories</Text>
      </Pressable>
    </View>
  );
}
