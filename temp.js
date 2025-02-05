const [location, setLocation] = useState(null);
  const [insideBoundary, setInsideBoundary] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  Define the four corners of the boundary (lat/lng box)
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







Real-time Location
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