import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Header from "../../components/header";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right", 
        }}
      />
      <SignedIn>
        <View style={{backgroundColor:"white"}}>
          <Header />
        </View>
      </SignedIn>
      
      <SignedOut>
        <View style={styles.signedOutContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/logo-new-edited.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Proxy Eviscerated</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("auth/userselect")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SignedOut>

      <SignedIn>
        <View style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.imageContainerChart}>
              <Image
                source={require("../../assets/images/vector-pie-chart.jpg")}
                style={styles.imageChart}
                resizeMode="contain"
              />
            </View>

            <View style={styles.buttonContainer1}>
              <TouchableOpacity 
                style={styles.button1}
                onPress={()=>router.push("pages/location")}
              >
                <Text style={styles.buttonText1}>Current Class</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button1}>
                <Text style={styles.buttonText1}>Course Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SignedIn>
    </>
  );
}

const styles = StyleSheet.create({
  signedOutContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#D0C8F2",
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    elevation: 3,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  imageContainerChart: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  imageChart:{
    marginBottom: 20,
    paddingBottom: 10,
    marginTop: 20,
    width: 300,
    height: 300,
  },
  container1: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  headerRightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  iconSpacing: {
    marginRight: 15,
  },
  buttonContainer1: {
    width: "100%",
    alignItems: "center",
    gap: 15, 
  },
  button1: {
    backgroundColor: "#1E73E8",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 50,
    width: "85%",
    alignItems: "center",
    elevation: 3,
  },
  buttonText1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});