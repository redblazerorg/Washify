import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import CARWASH_DATA from './src/data/carwash_location';

import AppNavigation from "./src/navigations/AppNavigation";
import { AuthProvider } from "./src/context/AuthContext";
import { AppointmentsProvider } from "./src/context/AppointmentContext";

import LocationAvailability from "./src/screens/Location_Availability/LocationAvailability";
import Appointment from "./src/screens/Appointment/appointment";

const initializeCarwashData = async () => {
  try {
    const existingData = await AsyncStorage.getItem('carwash_data');
    if (!existingData) {
      await AsyncStorage.setItem('carwash_data', JSON.stringify(CARWASH_DATA));
    }
  } catch (error) {
    console.error('Error initializing carwash data:', error);
  }
};

export default function App() {
  useEffect(() => {
    initializeCarwashData();
  }, []);

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
