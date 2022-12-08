import * as React from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    Image, 
    TouchableOpacity,
} from 'react-native';
//import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';


export default function Profile() {

    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
         .signOut()
         .then( () => {
            navigation.replace("Login"); //CHECK

         })
         .catch(error => alert(error.message));
    }

    // function storeHighScore(userId, score) {
    
    //     const db = getDatabase();
    //     const reference = ref(db, 'users/' + userId);
    //     set(reference, {
    //         highscore: score,
    //     });
    // }

    return (
        <View style={styles.container}>
            <Text> Email: {auth.currentUser?.email} </Text>

            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center', 
        marginTop: 40,
    }, 
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }

});
//export default Profile;