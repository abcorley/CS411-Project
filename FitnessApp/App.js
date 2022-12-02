import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import WorkoutResultsScreen from './components/WorkoutResultsScreen';
import CreateWorkoutScreen from './components/CreateWorkoutScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="WorkoutResults" component={WorkoutResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
