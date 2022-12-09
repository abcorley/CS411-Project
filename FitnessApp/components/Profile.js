import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import ProfileStyleSheet from '../stylesheets/ProfileStyleSheet';

export default function Profile() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login'); // CHECK
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={ProfileStyleSheet.container}>
      <Text> Email: {auth.currentUser?.email} </Text>

      <TouchableOpacity onPress={handleSignOut} style={ProfileStyleSheet.button}>
        <Text style={ProfileStyleSheet.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
