import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [enteredFoodText, setEnteredFoodText] = useState('');
  

  function foodInputHandler(enteredText) {
    setEnteredFoodText(enteredText)
  };

  function foodSearchHandler() {
    fetch("https://10.192.18.181:5000/food/"  + enteredFoodText,
    {  
      method: "GET",
      headers: {
        'Content-type': 'application/json'
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
