import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutResultsScreen from './components/WorkoutResultsScreen';
import RecipeResults from './components/RecipeResults';
import RecipeScreen from './components/RecipeScreen';
import HomeScreen from './components/HomeScreen';
import UserLogin from './components/UserLogin';
import SignUp from './components/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={UserLogin} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WorkoutResults" component={WorkoutResultsScreen} />
        <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
        <Stack.Screen name="RecipeResults" component={RecipeResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
