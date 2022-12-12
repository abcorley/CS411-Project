import * as React from 'react';
import { useState } from 'react';
import { Text, View, Modal, Alert, Pressable, TextInput, FlatList } from 'react-native';
import { database, auth } from '../firebase';
import CalorieTrackerStyleSheet from '../stylesheets/CalorieTrackerStyleSheet';

export default function CalorieTracker({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(0);
  const [calories, onCalorieChange] = React.useState(0);
  const [foodAndDrink, onFoodAndDrinkChange] = React.useState([]);

  // Get User
  const user = auth.currentUser.uid;
  const currTotalCalories = database.ref(`users/${user}/totalCalories`);
  const currFoodAndDrink = database.ref(`users/${user}/foodAndDrink`);

  // Get current value of total calories from database
  currTotalCalories.get(
    'value',
    (snapshot) => {
      console.log(snapshot.val());
      onCalorieChange(snapshot.val());
    },
    function (error) {
      console.log(`Error: ${error.code}`);
    }
  );

  let currItems;
  let childKey;
  let childData;
  currFoodAndDrink.get(
    'value',
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        currItems.push({
          key: childKey,
          info: childData,
        });
      });
      onFoodAndDrinkChange(currItems);
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

  function updateFoodAndDrink() {
    const userRef = database.ref(`users/${user}`);
    const foodAndDrinkRef = userRef.child('foodAndDrink');
    const newKey = foodAndDrinkRef.push({
      name: text,
      calories: number,
    }).key;
    if (foodAndDrink.length === 0) {
      onFoodAndDrinkChange([
        {
          key: newKey,
          info: {
            name: text,
            calories: number,
          },
        },
      ]);
    } else {
      onFoodAndDrinkChange((prevFoodAndDrink) => [
        ...prevFoodAndDrink,
        {
          key: newKey,
          info: {
            name: text,
            calories: number,
          },
        },
      ]);
    }
  }

  function renderFoodAndDrink() {
    if (foodAndDrink.length === 0) {
      return <Text>You have not logged anything today</Text>;
    }
    return (
      <FlatList
        data={foodAndDrink}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Text>
            {item.info.name}:{item.info.calories} calories
          </Text>
        )}
      />
    );
  }

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
      <Text>Food and Drink Items</Text>
      {renderFoodAndDrink()}
    </View>
  );
}
