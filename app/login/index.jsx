import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../../constant/Color"; // Ensure you have this color file or replace it with a direct color code
import { useRouter } from "expo-router";


export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Circular Image Wrapper */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/logo-new-edited.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Title Text */}
      <Text style={styles.title}>Proxy Eviscerated</Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("login/userSelect")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0C8F2", // Light purple background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    // width: 230, 
    // height: 230, 
    borderRadius: 115, 
    // backgroundColor: "white", 
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: "black", 
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 5, // For Android shadow
    marginBottom: 30, 
  },
  image: {
    width: 240, 
    height: 240,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    width: "90%",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#1E73E8", 
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 25,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
