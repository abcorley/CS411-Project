import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import ProfileStyleSheet from '../stylesheets/ProfileStyleSheet';
import CreateWorkoutScreen from './CreateWorkoutScreen';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar 
      style={{
        borderRadius: 5,
        margin: 12,
        elevation: 5,
        borderWidth: 4,
        borderColor: '#AFA767'
      }}
      markedDates={{
        '2022-12-12': {selected: true, marked: true, selectedColor: '#E6D1D0'}
        }}/>
  
    <View style={styles.container}>

      <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('CreateWorkout')}>
        <Text style={ProfileStyleSheet.buttonText}>Create Workout</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#AFA767',
    color: 'white',
    width: 200,
    height: 50,
    borderRadius: 12,
    padding: 1,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


