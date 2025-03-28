import React, { useEffect, useState } from "react";
import { View, StyleSheet, PermissionsAndroid, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { useTheme } from './Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
const ShowMap = ({ route }) => {
  const { coordinates } = route.params;
  console.log(coordinates)
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [position, setPosition] = useState(null)
  const colors = useTheme()

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

useEffect(() => {
  if (hasLocationPermission) {
    const watcher = Geolocation.watchPosition(
      (pos) => {
        const location = pos.coords;
        setPosition(location);
      },
      (error) => Alert.alert(JSON.stringify(error)),
      { enableHighAccuracy: false, distanceFilter: 10, interval: 10000 }
    );

    return () => Geolocation.clearWatch(watcher);
  }
}, [hasLocationPermission]);

  if (!hasLocationPermission) {
    return <Text>Permission to access location denied</Text>;
  }

  if (!coordinates) {
    return (<View style={styles.container}>
    <ActivityIndicator size="large" color={colors.Primary} />
  </View>)
}
const mapCoordinates = {
  latitude: coordinates.lat,
  longitude: coordinates.lng,
};

const CurrentLocationCoordinates = position ? {
      latitude: position.latitude,
      longitude: position.longitude,
    }: null;
    console.log(CurrentLocationCoordinates)
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
        showsUserLocation = {true}
        followsUserLocation = {true}
      >
        <Marker coordinate={mapCoordinates} ></Marker>
        {CurrentLocationCoordinates && <Marker coordinate={CurrentLocationCoordinates} style={{opacity:0}}></Marker>}
        {CurrentLocationCoordinates && <MapViewDirections
      origin={CurrentLocationCoordinates}
      destination={mapCoordinates}
      apikey="AIzaSyBEhoXegQdZgL1z5vZc4gD0I_Q4MLnnsII"
      strokeWidth={5}
      strokeColor = {colors.Primary}
      /> }
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
  button:{
    position:"absolute",
    bottom : 20,
    right : 5,
    padding :5, 
    
  },
  icon:{
    backgroundColor : "rgba(255, 255, 255, 0.5)",
    padding :10 ,
    borderRadius :10
  }
});

export default ShowMap;

