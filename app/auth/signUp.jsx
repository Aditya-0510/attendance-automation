import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import Color from '../../constant/Color';
import { auth } from './../../config/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
   const router = useRouter();

   const [email,setEmail] = useState(); 
   const [password,setPassword] = useState(); 

   const onCreateAccount =() =>{
        if(!email || !password){
            ToastAndroid.show("Please fill all details",ToastAndroid.BOTTOM);
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            router.push('(tabs)')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);

            if(errorCode=='auth/email-already-in-use'){
                ToastAndroid.show('Email already exists',ToastAndroid.BOTTOM);
            }
            // ..
        });

   }
   return (
      <View style={styles.container}>
         <Text style={styles.textHeader}>Sign Up</Text>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='Full name' 
               style={styles.textInput} 
               placeholderTextColor={Color.GRAY} 
            />
         </View>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='email' 
               style={styles.textInput} 
               placeholderTextColor={Color.GRAY} 
               onChangeText={(value)=>setEmail(value)}
            />
         </View>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='password' 
               style={styles.textInput} 
               secureTextEntry={true} 
               placeholderTextColor={Color.GRAY} 
               onChangeText={(value)=>setPassword(value)}
            />
         </View>

         <View style={styles.buttonContainer}>
            <TouchableOpacity 
               style={styles.button} 
               onPress={onCreateAccount}
            >
               <Text style={styles.buttonText} >Create Account</Text>
            </TouchableOpacity>


            <TouchableOpacity 
               style={styles.button} 
               onPress={() => router.push("login/signIn")}
            >
               <Text style={styles.buttonText} >Already have account? Sign In</Text>
            </TouchableOpacity>
         
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
   },
   textHeader: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: Color.PRIMARY,
   },
   inputContainer: {
      marginBottom: 15,
   },
   textInput: {
      padding: 12,
      borderWidth: 1,
      borderRadius: 25,
      backgroundColor: '#e6f2ff',
      borderColor: '#cce0ff',
      fontSize: 16,
      color: '#000',
   },
   buttonContainer: {
    alignItems: 'center', // This centers the button horizontally
 },
   button: {
      backgroundColor: Color.PRIMARY,
      paddingVertical: 15,
      borderRadius: 25,
      marginTop: 20,
      alignItems: 'center',
      width:'80%'
   },
   buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
   },
   googleButton: {
      backgroundColor: 'white',
      paddingVertical: 15,
      borderRadius: 25,
      marginTop: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      width:'70%'
   },
   googleButtonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10, // Add space between icon and text
   },
   googleIcon: {
      width: 24,
      height: 24,
   },
});