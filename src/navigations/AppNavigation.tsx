import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import LocationAvailability from "../screens/Location_Availability/LocationAvailability";
import Test from "../screens/Appointment/appointment";
import Lol from "../screens/test";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="LocationAvailability"
        component={LocationAvailability}
      />
      <Stack.Screen name="Appointment" component={Test} />
      <Stack.Screen name="Lol" component={Lol} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
