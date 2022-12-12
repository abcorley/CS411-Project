import * as React from 'react';
import { useState } from 'react';
import { Text, View, Modal, Alert, Pressable, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { database, auth } from '../firebase';
import CalorieTrackerStyleSheet from '../stylesheets/CalorieTrackerStyleSheet';

export default function CalorieTracker({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = React.useState(null);
  const [addedCalories, onAddCalories] = React.useState(0);
  const [calories, onCalorieChange] = React.useState(0);
  const [foodAndDrink, onItemChange] = React.useState([]);

  // Get User
  const user = auth.currentUser.uid;
  const totalCaloriesRef = database.ref(`users/${user}/totalCalories`);
  const foodAndDrinkRef = database.ref(`users/${user}/foodAndDrink`);

  // Get the Current totalCalories stored for the user
  function getCalories() {
    let currCalories;
    totalCaloriesRef.on(
      'value',
      (snapshot) => {
        console.log('Reading Total calories');
        currCalories = snapshot.val();
      },
      function (error) {
        console.log(`Error: ${error.code}`);
      }
    );
    return currCalories;
  }

  React.useEffect(() => {
    onCalorieChange(getCalories());
  }, []);

  function getFoodAndDrink() {
    console.log('Read DB');
    const curItems = [];
    foodAndDrinkRef.on(
      'value',
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          items.push({
            id: childSnapshot.key,
            info: childSnapshot.val(),
          });
          console.log(childSnapshot.key);
          console.log(childSnapshot.val());
        });
        console.log(foodAndDrink);
      },
      function (error) {
        console.log(`Error: ${error.code}`);
      }
    );
    return curItems;
  }

  function updateCalories() {
    const userRef = database.ref(`users/${user}`);
    const newTotal = parseInt(addedCalories) + parseInt(calories);
    userRef.update({ totalCalories: newTotal });
  }

  function updateFoodAndDrink() {
    const userRef = database.ref(`users/${user}`);
    const ref = userRef.child('foodAndDrink');
    ref
      .push({
        item: name,
        calories: addedCalories,
      })
      .getKey();
    console.log('Update');
    getFoodAndDrink();
    console.log(foodAndDrink);
  }

  getCalories();
  getFoodAndDrink();
  console.log('Initial');
  console.log(calories);
  console.log(foodAndDrink);

  return (
    <View>
      <Text style={CalorieTrackerStyleSheet.header}>Total Calories Today</Text>
      <View style={CalorieTrackerStyleSheet.circle}>
        <Text style={CalorieTrackerStyleSheet.inCircleText}>{calories} Calories</Text>
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
              onChangeText={onChangeName}
              value={name}
              placeholder="Enter Name of Food or Drink"
            />
            <Text>Calories</Text>
            <TextInput
              style={CalorieTrackerStyleSheet.input}
              onChangeText={onAddCalories}
              value={addedCalories}
              placeholder="Enter Calories"
              keyboardType="numeric"
            />
            <Pressable
              style={CalorieTrackerStyleSheet.modalCloseButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                updateCalories();
                updateFoodAndDrink();
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
      <View>
        <Text>What You&apos;ve Consumed Today</Text>
        <View>
          <Text>You haven&apos;t logged anything for today</Text>;
        </View>
      </View>
    </View>
  );
}
