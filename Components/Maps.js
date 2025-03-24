import React, { useEffect } from "react";
import { View, StyleSheet, PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// Request permission for location
// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: "Location Permission",
//         message: "This app needs access to your location",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK",
//       }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("Location permission granted");
//     } else {
//       console.log("Location permission denied");
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const ShowMap = () => {
  // const { latitude, longitude } = route.params;
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        {/* <Marker coordinate={{ latitude, longitude }} /> */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ShowMap;
// 67e14cf20ca0d113761538sygc264d9