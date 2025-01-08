import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import positions from "../../data/carwash_location";

const LocationAvailability = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // const mapRef = useRef<MapView>(null);

  // After the component mounts
  // useEffect(() => {
  //   if (positions.length > 0 && mapRef.current) {
  //     mapRef.current.fitToCoordinates(
  //       positions.map((pos) => ({
  //         latitude: pos.latitude,
  //         longitude: pos.longitude,
  //       })),
  //       {
  //         edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Optional padding
  //         animated: true,
  //       }
  //     );
  //   }
  // }, [positions]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <MapView
        style={styles.map}
        initialRegion={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922, // Controls the zoom level
                longitudeDelta: 0.0421, // Controls the zoom level
              }
            : undefined // Waiting until the location is available
        }
        showsUserLocation={true} // Highlights the user's current location,
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        )}
        {positions.map((pos) => (
          <Marker
            key={pos.id} // Use unique key
            coordinate={{
              latitude: pos.latitude,
              longitude: pos.longitude,
            }}
            title={pos.title}
          />
        ))}
      </MapView>
    </View>
  );
};

export default LocationAvailability;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
