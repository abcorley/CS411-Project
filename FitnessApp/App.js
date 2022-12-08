import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutResultsScreen from './components/WorkoutResultsScreen';

import HomeScreen from './components/HomeScreen';
import UserLogin from './components/UserLogin';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={UserLogin} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WorkoutResults" component={WorkoutResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
