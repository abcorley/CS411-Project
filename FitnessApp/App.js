import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutResultsScreen from './components/WorkoutResultsScreen';

import HomeScreen from './components/HomeScreen';
import UserLogin from './components/UserLogin';
import Profile from './components/Profile';

// const Tab = createBottomTabNavigator();
// function Tabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
//       <Tab.Screen name="UserLogin" component={UserLogin} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   );
// }

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

    // <NavigationContainer>
    //  <Stack.Navigator>
    //     <Stack.Screen
    //       name="Root"
    //       component={Tabs}
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
