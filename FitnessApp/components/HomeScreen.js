import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import CreateWorkoutScreen from './CreateWorkoutScreen';
import CalorieTracker from './CalorieTracker';
import RecipeScreen from './RecipeScreen';

// MAYBE ADD NAVBAR HERE FOR OTHER PAGES??
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
      <Tab.Screen name="Calorie Tracker" component={CalorieTracker} />
      <Tab.Screen name="RecipeScreen" component={RecipeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// export default HomeScreen;
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
// });

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
  },
});
