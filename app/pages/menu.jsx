import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router,Stack } from "expo-router";
import { useClerk,useUser } from "@clerk/clerk-expo";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function MenuScreen() {
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const { signOut } = useClerk();
  const { user } = useUser();
  const username = user.firstName ? `${user.firstName}`:user.username;
  const email = user.emailAddresses[0]?.emailAddress;
  const profileImageUrl = user?.imageUrl || user?.profileImageUrl;

  const emailId = email.slice(0,8);

  useEffect(() => {
    // Slide in when component mounts
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      speed: 15,
      bounciness: 5,
    }).start();
  }, []);

  const handleClose = () => {
    // Slide out when closing
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.back();
    });
  };

  const handleSignOut = async () => {
    // Animate out before signing out
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      await signOut();
      router.replace("/auth/userselect");
    });
  };

  const handleChangeAcc = async () => {
    // Animate out before changing account
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      try {
        await signOut();  // Sign out current user first
        router.replace("/auth/sign-in");
      } catch (error) {
        console.error("Error changing account:", error);
      }
    });
  };


  return (
    <>
    <Stack>
    <Stack.Screen 
        name="menu" 
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_left',
          headerShown: false,
        }}
      />
    </Stack>
    <View style={styles.mainContainer}>
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnim }],
            width: '90%',
          }
        ]}
      >
        {/* Header Section */}
        <TouchableOpacity onPress={handleClose} style={styles.backButton}>
          <FontAwesome name="close" size={24} color="black" />
        </TouchableOpacity>

        {/* Profile Section */}
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

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSignOut}
          >
            {/* <View style={styles.buttonDot} /> */}
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleChangeAcc}
          >
            {/* <View style={styles.buttonDot} /> */}
            <Text style={styles.buttonText}>Change Account</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* White section on the right */}
      <View style={styles.whiteSideBar} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    // backgroundColor: "#1E73E8",
    backgroundColor:"white",
    paddingHorizontal: 16,
  },

  whiteSideBar: {
    width: '25%',
    backgroundColor: 'white',
    borderLeftWidth: 4,  // Added border to white sidebar
    borderLeftColor: '#E0E0E0',
  },
  backButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  profileImage: {
    width: 150,
    height: 150,
    backgroundColor: "#f5f5f5",
    overflow:"hidden",
    borderRadius: 75,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProfile:{
    width:"100%",
    height:"100%",
    borderRadius:75,
  },
  profileName: {
    fontSize: 18,
    color: "1E73E8",
    marginBottom: 4,
    fontWeight: '500',
  },
  profileRole: {
    fontSize: 14,
    color: "1E73E8",
    opacity: 0.8,
  },
  buttonsContainer: {
    marginTop: 'auto',
    marginBottom: 40,
    gap:3,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal:12,
    marginBottom: 12,
    width:"70%",
    backgroundColor:"#1E73E8",
    borderRadius:20,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: '500',
  },
});