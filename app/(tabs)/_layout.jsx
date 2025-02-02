import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';   

export default function TabLayout() {
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