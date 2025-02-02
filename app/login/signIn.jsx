import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from "expo-router";
import React from 'react';
import Color from '../../constant/Color';

export default function SignIn() {
   const router = useRouter();
   return (
      <View style={styles.container}>
         <Text style={styles.textHeader}>Sign In</Text>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='email' 
               style={styles.textInput} 
               placeholderTextColor={Color.GRAY} 
            />
         </View>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='password' 
               style={styles.textInput} 
               secureTextEntry={true} 
               placeholderTextColor={Color.GRAY} 
            />
         </View>

         <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText} onPress={() => router.push("./(tabs)/index")}>Sign In</Text>
            </TouchableOpacity>
         

         <TouchableOpacity style={styles.googleButton}>
            <Image 
               source={require("D:/Project react native/my-app/assets/images/google-logo.jpg")}
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