import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";

export default function Verification() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(null);
  const [biometricType, setBiometricType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);
  const [showRecordedMessage, setShowRecordedMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (compatible) {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        setIsBiometricSupported(true);
        if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setBiometricType("Fingerprint");
        } else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setBiometricType("Face Recognition");
        }
      } else {
        setIsBiometricSupported(false);
      }
    };

    checkBiometricSupport();
  }, []);

  const authenticateUser = async () => {
    if (isVerificationComplete) return;
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: `Authenticate with ${biometricType}`,
      fallbackLabel: "Use Password",
    });

    if (result.success) {
      setIsAuthenticated(true);
      setIsVerificationComplete(true);
      setShowRecordedMessage(true);
      // Wait for 2 seconds to show the success message before redirecting
      setTimeout(() => {
        router.push("pages/recorded");
      }, 2000);
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/images/logo-new-edited.jpg")} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>Biometric Authentication</Text>

      {showRecordedMessage ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>✅ Attendance Recorded Successfully!</Text>
          <Text style={styles.redirectText}>Redirecting...</Text>
        </View>
      ) : isBiometricSupported === null ? (
        <Text style={styles.text}>Checking for biometric support...</Text>
      ) : isBiometricSupported ? (
        <View>
          <Text style={styles.text}>
            Please authenticate using your {biometricType}.
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={authenticateUser}
          >
            <Text style={styles.buttonText}>Authenticate</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>
          Biometric authentication is not supported on this device.
        </Text>
      )}

      {!isAuthenticated && !isVerificationComplete && (
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => router.push("auth")}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#D0C8F2" 
  },
  image: { 
    width: 240, 
    height: 240, 
    marginBottom: 30 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "black", 
    textAlign: "center", 
    marginTop: 20, 
    fontStyle: "italic", 
    width: "90%", 
    marginBottom: 30 
  },
  text: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#333" 
  },
  button: { 
    backgroundColor: "#1E73E8", 
    paddingVertical: 12, 
    paddingHorizontal: 40, 
    borderRadius: 50, 
    marginTop: 25, 
    elevation: 3 
  },
  logoutButton: { 
    backgroundColor: "#dc3545", 
    paddingVertical: 12, 
    paddingHorizontal: 40, 
    borderRadius: 8, 
    marginVertical: 10 
  },
  buttonText: { 
    textAlign: "center", 
    fontSize: 16, 
    color: "white", 
    fontWeight: "bold" 
  },
  successContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 10,
  },
  redirectText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  }
});