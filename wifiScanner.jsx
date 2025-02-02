import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const WifiScanner = () => {
  const [wifiList, setWifiList] = useState([]);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission Required',
            message:
              'This app needs location permission to scan nearby Wi-Fi networks.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const scanWifiNetworks = async () => {
    try {
      const networks = await WifiManager.reScanAndLoadWifiList();
      console.log('Nearby Wi-Fi Networks:', networks);
      setWifiList(networks);
    } catch (error) {
      console.error('Error scanning Wi-Fi networks:', error);
    }
  };

  useEffect(() => {
    requestPermissions(); // Request permissions when the component mounts
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Nearby Wi-Fi Networks:</Text>
      {wifiList.map((wifi, index) => (
        <Text key={index}>
          {wifi.SSID} ({wifi.BSSID}) - Signal Strength: {wifi.level}
        </Text>
      ))}
      <Button title="Scan Wi-Fi" onPress={scanWifiNetworks} />
    </View>
  );
};

export default WifiScanner;
