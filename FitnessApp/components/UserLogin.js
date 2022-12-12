import * as React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/core';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { auth } from '../firebase';
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
        navigation.replace('Root');
      }
    });
    return unsubscribe;
  }, []);

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

  const onFooterLinkPress = () => {
    navigation.navigate('Sign Up');
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

  // Code to get gitHub user email
  /* async function getUserEmail(code) {
    const octokit = new Octokit({
      auth: code,
    });
    const gitresponse = await octokit.request('GET /user', {});
    console.log(gitresponse);
  } */

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log(response);
      const { code } = response.params;
      /* const {
        authentication: { accessToken },
      } = response;
      console.log(accessToken);
      getUserEmail(accessToken); */
      navigation.replace('Root');
    }
  }, [response]);

  return (
    <View style={LoginStyleSheet.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={LoginStyleSheet.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={LoginStyleSheet.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <TouchableOpacity style={LoginStyleSheet.button} onPress={() => handleLogin()}>
          <Text style={LoginStyleSheet.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={LoginStyleSheet.gitHubButton}>
          <Text
            onPress={() => {
              promptAsync();
              // getUserEmail();
            }}
          >
            Sign Up With Github
          </Text>
        </View>
        <View style={LoginStyleSheet.footerView}>
          <Text style={LoginStyleSheet.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={LoginStyleSheet.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
