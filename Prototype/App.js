import * as React from 'react';
import { NavigationContainer, View, Text } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from './components/WorkoutScreen';
import ResultsScreen from './components/ResultsScreen';
import HomeScreen from './components/HomeScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}