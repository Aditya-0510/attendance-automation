import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from "expo-router";
import React, { useState, useCallback } from 'react';
import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking'
import Color from '../../constant/Color';
import * as WebBrowser from 'expo-web-browser'
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
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

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        router.push('(home)');
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
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
            console.error(JSON.stringify(signInAttempt, null, 2));
         }
      } catch (err) {
         console.error(JSON.stringify(err, null, 2));
      }
   }, [isLoaded, emailAddress, password]);

   return (
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

            <TouchableOpacity style={styles.googleButton} onPress={onPress}>
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
