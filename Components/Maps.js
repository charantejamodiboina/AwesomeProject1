import React, { useEffect, useState } from "react";
import { View, StyleSheet, PermissionsAndroid, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const ShowMap = ({ route }) => {
  const { coordinates } = route.params;
  console.log(coordinates)
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "We need your location to show the map.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission granted");
        setHasLocationPermission(true);
      } else {
        console.log("Location permission denied");
        setHasLocationPermission(false);
      }
    };

    requestPermission();
  }, []);

  if (!hasLocationPermission) {
    return <Text>Permission to access location denied</Text>;
  }

  if (!coordinates) {
    return <Text>Loading map...</Text>;
}
const mapCoordinates = {
  latitude: coordinates.lat,
  longitude: coordinates.lng,
};
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
          latitude: mapCoordinates.latitude,
          longitude: mapCoordinates.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker coordinate={mapCoordinates} >
 
</Marker>
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