import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter , Stack} from "expo-router";
import React, { useState, useCallback } from 'react';
import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking'
import Color from '../../constant/Color';
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
};

WebBrowser.maybeCompleteAuthSession()

export default function SignIn() {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
   const router = useRouter();
   const { signIn, setActive, isLoaded } = useSignIn();

   const [emailAddress, setEmailAddress] = useState('');
   const [password, setPassword] = useState('');
   
   const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
         setActive({ session: createdSessionId });
         router.push('(home)');
       } else {
         Alert.alert('Google Sign-In', 'Unable to complete sign-in process');
       }
       
    } catch (err) {
      Alert.alert('Google Sign-In Error', err.message || 'An error occurred during Google sign-in');
    }
  }, [])
   
   const onSignInPress = useCallback(async () => {
      if (!isLoaded) return;
      try {
         const signInAttempt = await signIn.create({
            identifier: emailAddress,
            password,
         });
         if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId });
            router.push('(home)');
         } else {
            Alert.alert('Sign In', 'Unable to complete sign-in process');
         }
      } catch (err) {
         Alert.alert('Sign In Error', err.message || 'An error occurred during sign-in');
      }
   }, [isLoaded, emailAddress, password]);

   return (
      <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <View style={styles.container}>
         <Text style={styles.textHeader}>Sign In</Text>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='Email' 
               style={styles.textInput} 
               placeholderTextColor={Color.GRAY} 
               autoCapitalize='none'
               value={emailAddress}
               onChangeText={setEmailAddress}
            />
         </View>

         <View style={styles.inputContainer}>
            <TextInput 
               placeholder='Password' 
               style={styles.textInput} 
               secureTextEntry={true} 
               placeholderTextColor={Color.GRAY} 
               value={password}
               onChangeText={setPassword}
            />
         </View>

         <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onSignInPress}>
               <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=>router.push("/auth/sign-up")}>
               <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton} onPress={onPress}>
               <Image 
                  source={require("../../assets/images/google-logo.jpg")}
                  style={styles.googleIcon}
               />
               <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
         </View>
      </View>
      </>
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
      alignItems: 'center',
   },
   button: {
      backgroundColor: Color.PRIMARY,
      paddingVertical: 15,
      borderRadius: 25,
      marginTop: 20,
      alignItems: 'center',
      width: '70%',
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
      width: '70%',
   },
   googleButtonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
   },
   googleIcon: {
      width: 24,
      height: 24,
   },
});