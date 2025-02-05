import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import Header from "../../components/header";

export default function notification() {
  return (
    <>
    <Header/>
    <TouchableOpacity>
      <Text>Class Started - 1.5 hrs</Text>
      <Text>Software Engineering</Text>
      <Text>by VivekRaj VK</Text>
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({})