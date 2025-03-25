import React, { useEffect, useState } from "react";
import { View, StyleSheet, PermissionsAndroid, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const ShowMap = ({ coordinates }) => {
  // const [coordinates, setCoordinates] = useState({
  //   latitude: 37.78825,
  //         longitude: -122.4324,
  // })
  if (!coordinates) {
    return <Text>Loading map...</Text>; // Show loading text if coordinates are not available
}
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker coordinate={coordinates} >
 
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