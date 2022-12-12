import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutResultsScreen from './components/WorkoutResultsScreen';
import RecipeResults from './components/RecipeResults';
import RecipeScreen from './components/RecipeScreen';
import RootScreen from './components/RootScreen';
import UserLogin from './components/UserLogin';
import SignUp from './components/SignUp';
import CreateWorkoutScreen from './components/CreateWorkoutScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={UserLogin} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateWorkoutScreen" component={CreateWorkoutScreen} />
        <Stack.Screen name="WorkoutResults" component={WorkoutResultsScreen} />
        <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
        <Stack.Screen name="RecipeResults" component={RecipeResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
