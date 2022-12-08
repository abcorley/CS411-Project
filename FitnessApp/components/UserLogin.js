import * as React from 'react';
import { KeyboardAvoidingView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, database } from '../firebase';
import LoginStyleSheet from '../stylesheets/LoginStyleSheet';

/* export default function UserLogin() {
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
  
    const handleSignUp = () => {
        console.log("IN HANDLESIGNUP");
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with: ', user.email);
            })
            .catch(error => alert(error.message));
        

        console.log("submit new user creds");
        set(ref(db, 'users/' + email), {
            //username: name,
            email: email,
            password: password
        }).then(() => {
            //Data saved successfully
            alert('data submitted');
        }).catch((error) => {
            //the write failed
            alert(error);
        });
    }

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

    // function createSubmissionDB() {
    //     console.log("IN CREATESUBMISSIONDB");
    //     set(ref(db, 'users/' + email), {
    //         //username: name,
    //         email: email,
    //         password: password
    //     }).then(() => {
    //         //Data saved successfully
    //         alert('data submitted');
    //     }).catch((error) => {
    //         //the write failed
    //         alert(error);
    //     });
    // }
*/

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

  //Function to add new user to database
  function writeUserData(userCredentials) {
    console.log(userCredentials.uid);
    database.ref(`users/${userCredentials.uid}`).set({
      email: userCredentials.email,
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
        writeUserData(user)
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
      </View>
    </KeyboardAvoidingView>
  );
}
