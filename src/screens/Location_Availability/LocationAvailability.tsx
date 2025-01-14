import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import CARWASH_DATA from "../../data/carwash_location";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "../Calendar_Picker";
import { ServiceType } from "../../utils/enum";
import { Appointment, useAppointments } from "../../context/AppointmentContext";

interface Service {
  service: ServiceType;
  price: number;
  duration: number;
}

const LocationAvailability = () => {
  //usestate
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openFloatingLocation, setOpenFloatingLocation] =
    useState<boolean>(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [selectedDateInfo, setSelectedDateInfo] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  //variable
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  //hooks
  const mapRef = useRef<MapView>(null);
  const { addAppointment, appointments } = useAppointments();

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

  //function
  const handleDateChange = (dateInfo: any) => {
    // dateInfo contains { date, daysDifference }
    setSelectedDateInfo(dateInfo);

    // Now you can use the date however you need
    console.log("Selected date:", dateInfo.date);
    console.log("Days difference:", dateInfo.daysDifference);
  };

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

  const handleAdd = () => {
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      job_description: selectedService?.service || "",
      price: selectedService?.price || 0,
      duration: selectedService?.duration || 0,
      deadline: selectedDateInfo.daysDifference * 24,
      laxity: 0, //default to 0
    };
    addAppointment(newAppointment);
  };

  const defaultDate = selectedDateInfo?.date
    ? new Date(selectedDateInfo.date)
    : (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      })();

  //views
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
          <Text>Services Available</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          position: "absolute",
          backgroundColor: "whitesmoke",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          bottom: 0,
          left: 0,
          right: 0,
          height: openSheet ? height * 0.45 : 0,
        }}
      >
        {selectedMarker && (
          <View style={styles.markerDetails}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // height: 50,
                width: width * 0.9,
              }}
            >
              <Text style={styles.sheetTitle}>{selectedMarker.title}</Text>
              <TouchableOpacity
                style={
                  {
                    // alignSelf: "flex-end",
                    // width: 60,
                    // height: 30,
                    // alignItems: "center",
                  }
                }
                onPress={() => setOpenSheet(!openSheet)}
              >
                <Ionicons name="close" size={30} />
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              onPress={() =>
                navigateToLocation(
                  selectedMarker.latitude,
                  selectedMarker.longitude
                )
              }
            > */}
            {/* <Text style={styles.sheetContent}>
                Latiude: {selectedMarker.latitude}
                {"\n"}
                Longitude: {selectedMarker.longitude}
              </Text> */}
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Services Available
            </Text>
            {selectedMarker.services.map((service: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedService(service)}
                style={{
                  padding: 10,
                  marginVertical: 5,
                  borderWidth: 1,
                  borderColor: selectedService === service ? "#007AFF" : "gray",
                  borderRadius: 5,
                }}
              >
                <Text>Service: {service.service}</Text>
                <Text>Price: RM {service.price}</Text>
                <Text>Duration: {service.duration} hours</Text>
              </TouchableOpacity>
            ))}

            {/* {selectedService && (
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: "bold" }}>Selected Service:</Text>
                  <Text>Service: {selectedService.service}</Text>
                  <Text>Price: {selectedService.price} USD</Text>
                  <Text>Duration: {selectedService.duration} mins</Text>
                </View>
              )} */}
            <CalendarPicker
              onDateChange={handleDateChange}
              initialDate={defaultDate}
            />
            <Button
              color={"#007AFF"}
              title="Add Appointment"
              onPress={handleAdd}
            />
            {/* </TouchableOpacity> */}
          </View>
        )}
      </ScrollView>
      {openFloatingLocation && (
        <View style={styles.floatingCard}>
          <Text style={styles.cardText}>Place</Text>
          {CARWASH_DATA.map((data) => (
            <Text
              key={data.id}
              onPress={() => {
                navigateToLocation(data.latitude, data.longitude);
                handleAvailableLocation();
                handleMarkerPress(data);
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
