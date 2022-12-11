import * as React from 'react';
import { useState } from 'react';
import { Text, View, Modal, Alert, Pressable, TextInput, FlatList, Item } from 'react-native';
import { database, auth } from '../firebase';
import CalorieTrackerStyleSheet from '../stylesheets/CalorieTrackerStyleSheet';

export default function CalorieTracker({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = React.useState(null);
  const [addedCalories, onAddCalories] = React.useState(0);
  const [calories, onCalorieChange] = React.useState(0);

  // Get User
  const user = auth.currentUser.uid;
  const totalCalories = database.ref(`users/${user}/totalCalories`);
  const foodAndDrink = database.ref(`users/${user}/foodAndDrink`);

  // Get the Current totalCalories stored for the user
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

  foodAndDrink.get(
    'value',
    (snapshot) => {
      console.log(snapshot.val());
      onCalorieChange(snapshot.val());
    },
    function (error) {
      console.log(`Error: ${error.code}`);
    }
  );

  function updateCaloriesFoodDrink() {
    const userRef = database.ref(`users/${user}`);
    const newTotal = parseInt(addedCalories) + parseInt(calories);
    userRef.update({ totalCalories: newTotal });
    onCalorieChange(newTotal);
    const foodAndDrinkRef = userRef.child('foodAndDrink');
    foodAndDrinkRef.push({
      item: name,
      calories: addedCalories,
    });
  }

  const renderFoodAndDrink = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <View>
      <Text style={CalorieTrackerStyleSheet.header}>Total Calories Today</Text>
      <View style={CalorieTrackerStyleSheet.circle}>
        <Text style={CalorieTrackerStyleSheet.inCircleText}>{calories} Calories</Text>
      </View>
      <View>
        <Text>What You&apos;ve Consumed Today</Text>
        <FlatList
          data={foodAndDrink}
          renderItem={renderFoodAndDrink}
          keyExtractor={(item) => item.item}
        />
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
                updateCaloriesFoodDrink();
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
