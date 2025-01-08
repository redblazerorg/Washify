import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import LocationAvailability from "./src/screens/Location_Availability/LocationAvailability";
import Appointment from "./src/screens/Appointment/appointment";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LocationAvailability /> */}
      <Appointment />
      <Button onPress={() => {}} title="Go to map" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
