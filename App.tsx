import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import LocationAvailability from "./src/screens/Location_Availability/LocationAvailability";
import Appointment from "./src/screens/Appointment/appointment";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppNavigation from "./src/navigations/AppNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
