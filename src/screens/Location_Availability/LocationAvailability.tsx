import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import CARWASH_DATA from "../../data/carwash_location";
import { Ionicons } from "@expo/vector-icons";

const LocationAvailability = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openFloatingLocation, setOpenFloatingLocation] =
    useState<boolean>(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const mapRef = useRef<MapView>(null);

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

  const navigateToLocation = (latitude: number, longitude: number) => {
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  // let text = "Waiting...";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const handleAvailableLocation = () => {
    if (openSheet === true) {
      setOpenSheet(false);
    }

    setOpenFloatingLocation(!openFloatingLocation);
  };

  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker);
    setOpenSheet(true);
  };

  const CustomMarker = ({ item }: { item: any }) => {
    return (
      <Marker
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        onPress={() => handleMarkerPress(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : undefined
        }
        showsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            // title={"You are here"}
          />
        )}
        {CARWASH_DATA.map((pos) => (
          <CustomMarker key={pos.id} item={pos} />
        ))}
      </MapView>
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: 15,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 15,
        }}
      >
        <TouchableOpacity onPress={() => handleAvailableLocation()}>
          <Text>Available Car Wash Location</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "absolute",
          backgroundColor: "whitesmoke",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          bottom: 0,
          left: 0,
          right: 0,
          height: openSheet ? height * 0.4 : 0,
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            width: 60,
            height: 30,
            alignItems: "center",
          }}
          onPress={() => setOpenSheet(!openSheet)}
        >
          <Ionicons name="close" size={30} />
        </TouchableOpacity>

        {selectedMarker && (
          <View style={styles.markerDetails}>
            <Text style={styles.sheetTitle}>{selectedMarker.title}</Text>
            {/* Add more marker details here */}

            <TouchableOpacity
              onPress={() =>
                navigateToLocation(
                  selectedMarker.latitude,
                  selectedMarker.longitude
                )
              }
            >
              <Text style={styles.sheetContent}>
                Latitude: {selectedMarker.latitude}
                {"\n"}
                Longitude: {selectedMarker.longitude}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {openFloatingLocation && (
        <View style={styles.floatingCard}>
          <Text style={styles.cardText}>Floating Card</Text>
          {CARWASH_DATA.map((data) => (
            <Text
              key={data.id}
              onPress={() => {
                navigateToLocation(data.latitude, data.longitude);
              }}
            >
              {data.title}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default LocationAvailability;

const styles = StyleSheet.create({
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sheetContent: {
    fontSize: 16,
  },
  markerDetails: {
    padding: 10,
  },
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

  floatingCard: {
    position: "absolute",
    top: 60,
    right: 0,
    left: 0,
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 5, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
