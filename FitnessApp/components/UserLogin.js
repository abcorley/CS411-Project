import * as React from 'react';
import { KeyboardAvoidingView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native-elements';
import { auth, database } from '../firebase';
import LoginStyleSheet from '../stylesheets/LoginStyleSheet';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/9c8784b7b7c410187f4e',
};

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('test');
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);

  // Function to add new user to database
  function writeUserData(userCredentials) {
    console.log(userCredentials.uid);
    database.ref(`users/${userCredentials.uid}`).set({
      email: userCredentials.email,
      totalCalories: 0,
      calorieItems: [],
    });
  }

  const handleSignUp = () => {
    console.log('IN HANDLESIGNUP');
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log(user.uid);
        console.log('submit new user creds');
        writeUserData(user);
        console.log('Registered with: ', user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    console.log('IN HANDLELOGIN');
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log('Logged in with: ', user.email);
      })
      .catch((error) => alert(error.message));
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '9c8784b7b7c410187f4e',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'https://auth.expo.io/@abcorley/FitnessApp',
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <KeyboardAvoidingView style={LoginStyleSheet.container} behavior="padding">
      <View style={LoginStyleSheet.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={LoginStyleSheet.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={LoginStyleSheet.input}
          secureTextEntry
        />
      </View>
      <View style={LoginStyleSheet.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={LoginStyleSheet.button}>
          <Text style={LoginScreen.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[LoginStyleSheet.button, LoginStyleSheet.buttonOutline]}
        >
          <Text style={LoginScreen.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[LoginStyleSheet.button, LoginStyleSheet.buttonOutline]}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text style={LoginScreen.buttonOutlineText}> Sign in With Github</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
