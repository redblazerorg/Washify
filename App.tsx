import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import AppNavigation from "./src/navigations/AppNavigation";
import { AuthProvider } from './src/context/AuthContext';
import { AppointmentsProvider } from "./src/context/AppointmentContext";

import LocationAvailability from "./src/screens/Location_Availability/LocationAvailability";
import Appointment from "./src/screens/Appointment/appointment";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppointmentsProvider>
          <AppNavigation />
        </AppointmentsProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
