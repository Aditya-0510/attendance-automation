import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';  
import { auth } from '../../config/FirebaseConfig'; 
import { useRoute } from '@react-navigation/native';

export default function TabLayout() {
    const router = useRoute();
    const [authenticated,setAuthenticated] = useState(null)

    const onAuthStateChanged = (auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log(uid);
          // ...
        } else {
            router.push('/login')
            setAuthenticated(false)
          // User is signed out
          // ...
        }
      });

      useEffect(()=>{
        if(authenticated==false){
            router.push('/login')
        }
      },[authenticated])
  return (
    <Tabs screenOptions={{
        headerShown:false
      }}>
        <Tabs.Screen name='index' 
            options={{
                tabBarLabel:"Home",
                tabBarIcon:({color,size}) =>(
                    <Entypo name="home" size={size} color="color" />
                )
            }}
        />
        <Tabs.Screen name='AddNew' 
            options={{
                tabBarLabel:"Search",
                tabBarIcon:({color,size}) =>(
                    <FontAwesome name="search" size={size} color="color" />
                )
            }}
        />
        <Tabs.Screen name='Profile' 
            options={{
                tabBarLabel:"Profile",
                tabBarIcon:({color,size}) =>(
                    <Entypo name="user" size={size} color="color" />
                )
            }}
        />
    </Tabs>
  )
}

const styles = StyleSheet.create({})