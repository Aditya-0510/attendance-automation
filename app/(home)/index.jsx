import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as Location from "expo-location";

export default function LoginScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [insideBoundary, setInsideBoundary] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Define the four corners of the boundary (lat/lng box)
  const BOUNDARY = {
    corner1: { lat: 15.397724, lng: 75.026841 }, // San Francisco
    corner2: { lat: 15.397687, lng: 75.020629 },
    corner3: { lat: 15.387907, lng: 75.019605 },
    corner4: { lat: 15.387280, lng: 75.027314 },
  };

  // Check if location is inside the boundary
  const isInsideBoundary = (latitude, longitude) => {
    // Define the lat/lng range using the four corners
    const minLat = Math.min(BOUNDARY.corner1.lat, BOUNDARY.corner2.lat, BOUNDARY.corner3.lat, BOUNDARY.corner4.lat);
    const maxLat = Math.max(BOUNDARY.corner1.lat, BOUNDARY.corner2.lat, BOUNDARY.corner3.lat, BOUNDARY.corner4.lat);
    const minLng = Math.min(BOUNDARY.corner1.lng, BOUNDARY.corner2.lng, BOUNDARY.corner3.lng, BOUNDARY.corner4.lng);
    const maxLng = Math.max(BOUNDARY.corner1.lng, BOUNDARY.corner2.lng, BOUNDARY.corner3.lng, BOUNDARY.corner4.lng);
  
    // Check if the user's location is within the min/max latitude and longitude range
    return (
      latitude >= minLat &&
      latitude <= maxLat &&
      longitude >= minLng &&
      longitude <= maxLng
    );
  };
  

  // Request location permission and set up real-time tracking
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Watch for real-time location updates
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, // High accuracy for more precise location
          timeInterval: 1000, // Update every second
          distanceInterval: 1, // Update when there's a movement of at least 1 meter
        },
        (locationData) => {
          const { latitude, longitude } = locationData.coords;
          setLocation({ latitude, longitude });

          // Check if the location is inside the boundary
          const result = isInsideBoundary(latitude, longitude);
          setInsideBoundary(result);
        }
      );
    };

    getLocation();

    // Clean up the watcher on unmount
    // return () => Location.stopObserving();
  }, []);

  return (
    <View style={styles.container}>
      <SignedOut>
        {/* Proxy Eviscerated UI */}
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
      </SignedOut>

      <SignedIn>
        {/* Proxy Pakki UI */}
        <Text style={styles.titleSignedIn}>Proxy Pakki</Text>
        <Text style={styles.text}>Hello, {user?.emailAddresses[0].emailAddress}</Text>

        {/* Real-time Location */}
        {location ? (
          <View>
            <Text style={styles.text}>Latitude: {location.latitude}</Text>
            <Text style={styles.text}>Longitude: {location.longitude}</Text>
          </View>
        ) : (
          <Text style={styles.text}>Fetching your location...</Text>
        )}

        {/* Location Boundary Check */}
        {insideBoundary !== null && (
          <Text style={styles.text}>
            Inside Boundary: {insideBoundary ? "✅ Yes" : "❌ No"}
          </Text>
        )}

        {/* Location Error */}
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </SignedIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#D0C8F2",
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
  titleSignedIn: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#007bff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#1E73E8",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 25,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
});
