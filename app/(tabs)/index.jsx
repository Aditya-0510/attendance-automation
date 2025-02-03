import { View, Text,Button } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/login'); // Redirect to login screen on logout
    });
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={handleSignOut}/>
      {/* <Redirect href={'login'} />  */}
    </View>
  )
}