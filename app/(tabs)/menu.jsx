import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function MenuScreen() {
  const { signOut } = useClerk();
  const { user } = useUser(); // Make sure user is available

  // Ensure username and email are safely accessed
  const username = user?.firstName || user?.username || "Guest";
  const emailId = user?.emailAddresses?.[0]?.emailAddress?.slice(0, 8) || "No Email";
  const profileImageUrl = user?.imageUrl || user?.profileImageUrl;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/auth/userselect");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleChangeAcc = async () => {
    try {
      await signOut();
      router.replace("/auth/sign-in");
    } catch (error) {
      console.error("Error changing account:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            {profileImageUrl ? (
              <Image 
                source={{ uri: profileImageUrl }} 
                style={styles.imageProfile}
                resizeMode="cover"
              />
            ) : (
              <FontAwesome 
                name="user" 
                size={50} 
                color="#1E73E8" 
                style={{ textAlign: 'center' }} 
              />
            )}
          </View>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileRole}>{emailId}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleChangeAcc}
          >
            <Text style={styles.buttonText}>Change Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 0,
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
    borderRadius: 75,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProfile: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  profileName: {
    fontSize: 18,
    color: "#1E73E8",
    marginBottom: 4,
    fontWeight: '500',
  },
  profileRole: {
    fontSize: 14,
    color: "#1E73E8",
    opacity: 0.8,
  },
  buttonsContainer: {
    marginTop: 'auto',
    marginBottom: 40,
    alignItems: 'center',
    gap: 3,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    width: "70%",
    backgroundColor: "#1E73E8",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: '500',
  },
});
