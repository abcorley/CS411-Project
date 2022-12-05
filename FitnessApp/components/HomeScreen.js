import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from './Profile';
import WorkoutResultsScreen from './WorkoutResultsScreen';
import CreateWorkoutScreen from './CreateWorkoutScreen';

//MAYBE ADD NAVBAR HERE FOR OTHER PAGES??
const Tab = createBottomTabNavigator();

export default function HomeScreen() {

    const navigation = useNavigation();
    const handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          console.log('Signed Out');
          navigation.replace("Login");
        })
        .catch(error => alert(error.message));
    }

    return (
      // <View style={styles.container}>
      //       <Text> Email: {auth.currentUser?.email} </Text>
      //       <TouchableOpacity onPress={handleSignOut} style={styles.button}>
      //           <Text style={styles.buttonText}>Sign out</Text>
      //       </TouchableOpacity>
      // </View>

      <Tab.Navigator>
        <Tab.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>


      // <View>
      //   <Text> Main Home </Text>
      //   {/* <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      //     <Text style={styles.buttonText}>Sign out</Text>
      //   </TouchableOpacity> */}
      // </View>
    );
}

//export default HomeScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
//   }, 
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#0782F9',
//     width: '100%', 
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 40,
//   }, 
//   buttonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   }
//});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', 
    marginTop: 40,
  }, 
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  }
});