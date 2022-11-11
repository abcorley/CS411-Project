import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [enteredFoodText, setEnteredFoodText] = useState('');
  

  function foodInputHandler(enteredText) {
    setEnteredFoodText(enteredText)
  };

  function foodSearchHandler() {
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?" 
    + "query=" + enteredFoodText + "&" 
    + "number=5",
    {  
      "method": "GET",
      "headers": {
        "X-RapidAPI-Key": "cdb6ec9b8cmsh402031dae04fa04p1f7011jsn40359d2736a6",
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
      
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Testing Text</Text>
      <TextInput 
        placeholder="What are you eating?" 
        onChangeText={foodInputHandler}
      />
      <Button title="Search" 
        onPress={foodSearchHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
