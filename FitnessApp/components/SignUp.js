import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SignUpStyleSheet from '../stylesheets/SignUpStyleSheet';
import { auth, database } from '../firebase';

export default function SignUp({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to add new user to database
  function writeUserData(userCredentials) {
    database.ref(`users/${userCredentials.uid}`).set({
      name: fullName,
      email: userCredentials.email,
      totalCalories: 0,
      foodAndDrink: null,
    });
  }

  // Called when user hits Sign Up button
  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        writeUserData(user);
      })
      .catch((error) => alert(error.message));
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Root');
      }
    });
    return unsubscribe;
  }, []);

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={SignUpStyleSheet.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={SignUpStyleSheet.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
        />
        <TextInput
          style={SignUpStyleSheet.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={SignUpStyleSheet.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <TextInput
          style={SignUpStyleSheet.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity style={SignUpStyleSheet.button} onPress={() => handleSignUp()}>
          <Text style={SignUpStyleSheet.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={SignUpStyleSheet.footerView}>
          <Text style={SignUpStyleSheet.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={SignUpStyleSheet.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
