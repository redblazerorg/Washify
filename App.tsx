import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import LocationAvailability from "./src/screens/Location_Availability/LocationAvailability";
import Appointment from "./src/screens/Appointment/appointment";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppNavigation from "./src/navigations/AppNavigation";
import { AppointmentsProvider } from "./src/context/AppointmentContext";

export default function App() {
  return (
    <NavigationContainer>
      <AppointmentsProvider>
        <AppNavigation />
      </AppointmentsProvider>
    </NavigationContainer>
  );
}
