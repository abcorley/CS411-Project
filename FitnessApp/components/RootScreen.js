import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import CreateWorkoutScreen from './CreateWorkoutScreen';
import CalorieTracker from './CalorieTracker';
import RecipeScreen from './RecipeScreen';
import Home from './Home';

// MAYBE ADD NAVBAR HERE FOR OTHER PAGES??
const Tab = createBottomTabNavigator();

export default function RootScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'red',
        badgeColor: 'green',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calorie Tracker" component={CalorieTracker} />
      <Tab.Screen name="Recipes" component={RecipeScreen} />
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
