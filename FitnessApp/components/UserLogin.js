import * as React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Octokit } from '@octokit/core';
import { auth, database } from '../firebase';
import LoginStyleSheet from '../stylesheets/LoginStyleSheet';

// Endpoint for Github OAuth
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
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);

  // Function to add new user to database
  function writeUserData(userCredentials) {
    database.ref(`users/${userCredentials.uid}`).set({
      email: userCredentials.email,
      totalCalories: 0,
      foodAndDrink: null,
    });
  }

  const handleSignUp = () => {
    console.log('IN HANDLESIGNUP');
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
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

  // Authorization Request for github
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '9c8784b7b7c410187f4e',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'exp://10.239.239.100:19000',
      }),
    },
    discovery
  );

  //Code to get gitHub user email
  async function getUserEmail(code) {
    const octokit = new Octokit({
      auth: code,
    });
    const gitresponse = await octokit.request('GET /user', {});
    console.log(gitresponse);
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log(response);
      const { code } = response.params;
      const { authentication: { accessToken } } = response;
      console.log(accessToken);
      getUserEmail(accessToken);
      navigation.replace('Home');
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
        <Button
          disabled={!request}
          title="Login With GitHub Here"
          onPress={() => {
            promptAsync();
            getUserEmail();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
