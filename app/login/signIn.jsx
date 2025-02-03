import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import Color from '../../constant/Color';
import { auth } from './../../config/FirebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
   const router = useRouter();
   const [email,setEmail] = useState();
   const [password,setPassword] = useState();

   const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: "1060622069160-o567l17bq4l0anlpfn9kifuk7he9udnm.apps.googleusercontent.com",
      androidClientId: "1060622069160-o567l17bq4l0anlpfn9kifuk7he9udnm.apps.googleusercontent.com",
      // iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
   });

   const onSignInClick = () =>{

      if(!email || !password){
         ToastAndroid.show("Enter all the details",ToastAndroid.BOTTOM);
         return ;

      }
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         const user = userCredential.user;
         console.log(user);
         router.replace('(tabs)');
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         if(errorCode=='auth/invalid-credential'){
            ToastAndroid.show('Invalid credential',ToastAndroid.BOTTOM)
         }
      });
   }

   const signInWithGoogle = async () => {
      try {
         // Start Google sign-in process
         const result = await promptAsync();

         if (result?.type === 'success') {
            const { id_token } = result.params;
            const credential = GoogleAuthProvider.credential(id_token);

            // Sign in to Firebase with Google credential
            signInWithCredential(auth, credential)
               .then((userCredential) => {
                  console.log('Google Sign-In successful:', userCredential.user);
                  router.replace('(tabs)');
               })
               .catch((error) => {
                  console.error('Google Sign-In error:', error);
                  ToastAndroid.show('Google Sign-In failed', ToastAndroid.BOTTOM);
               });
         } else {
            console.log('Google Sign-In cancelled');
         }
      } catch (error) {
         console.error('Google Sign-In error:', error);
         ToastAndroid.show('Google Sign-In failed', ToastAndroid.BOTTOM);
      }
   };

   return (
      <View style={styles.container}>
         <Text style={styles.textHeader}>Sign In</Text>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='email' 
               style={styles.textInput} 
               placeholderTextColor={Color.GRAY} 
               onChangeText={(value) => setEmail(value)}
            />
         </View>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='password' 
               style={styles.textInput} 
               secureTextEntry={true} 
               placeholderTextColor={Color.GRAY} 
               onChangeText={(value)=> setPassword(value)}
            />
         </View>

         <View style={styles.buttonContainer}>
            <TouchableOpacity 
               style={styles.button} 
               onPress={onSignInClick}
            >
               <Text style={styles.buttonText} >Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity 
               style={styles.button} 
               onPress={() => router.push("login/signUp")}
            >
               <Text style={styles.buttonText} >Sign Up</Text>
            </TouchableOpacity>
         

         <TouchableOpacity 
            style={styles.googleButton}
            onPress={signInWithGoogle}
            disabled={!request}
         >
            <Image 
               source={require("../../assets/images/google-logo.jpg")}
               style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
      width:'70%'
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