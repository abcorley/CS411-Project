import * as React from 'react';
import { useState } from 'react';
import { Text, View, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import CalorieTrackerStyleSheet from '../stylesheets/CalorieTrackerStyleSheet';

export default function CalorieTracker({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);
  return (
    <View>
      <Text style={CalorieTrackerStyleSheet.header}>Total Calories Today</Text>
      <View style={CalorieTrackerStyleSheet.circle}>
        <Text>Calories</Text>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={CalorieTrackerStyleSheet.popupOverlay}>
          <View style={CalorieTrackerStyleSheet.modal}>
            <SafeAreaView>
              <Text>Name</Text>
              <TextInput
                style={CalorieTrackerStyleSheet.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Enter Name of Item"
              />
              <Text>Calories</Text>
              <TextInput
                style={CalorieTrackerStyleSheet.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter Calories"
                keyboardType="numeric"
              />
            </SafeAreaView>
            <Pressable
              style={CalorieTrackerStyleSheet.modalCloseButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={CalorieTrackerStyleSheet.modalOpenButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={CalorieTrackerStyleSheet.text}>Add Calories</Text>
      </Pressable>
    </View>
  );
}
