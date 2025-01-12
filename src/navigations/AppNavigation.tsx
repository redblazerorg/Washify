import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../screens/Auth/SignIn';

import Home from "../screens/Home/Home";
import LocationAvailability from "../screens/Location_Availability/LocationAvailability";
import Appointment from "../screens/Appointment/appointment";
import Profile from "../screens/Profile/Profile";
import SignIn from "../screens/Auth/SignIn";
import SignUp from "../screens/Auth/SignUp";
import ForgotPassword from "../screens/Auth/ForgotPassword";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
          <Stack.Screen 
            name="SignIn" 
            component={SignIn}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUp}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ForgotPassword" 
            component={ForgotPassword}
            options={{
              headerShown: false
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={({ navigation }) => ({
              headerTitle: "Home",
              headerTitleAlign: "center",
              // headerRight: () => (
              //   <Ionicons 
              //     name="settings-outline" 
              //     size={24} 
              //     onPress={() => navigation.navigate('Settings')}
              //     style={{ marginRight: 15 }}
              //   />
              // ),
            })}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ navigation }) => ({
              headerTitle: "Profile",
              headerTitleAlign: "center",
              headerLeft: () => (
                <Ionicons 
                  name="arrow-back" 
                  size={24} 
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 15 }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="LocationAvailability"
            component={LocationAvailability}
            options={({ navigation }) => ({
              headerTitle: "Location Availability",
              headerTitleAlign: "center",
              headerLeft: () => (
                <Ionicons 
                  name="arrow-back" 
                  size={24} 
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 15 }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Appointment"
            component={Appointment}
            options={({ navigation }) => ({
              headerTitle: "Appointment",
              headerTitleAlign: "center",
              headerLeft: () => (
                <Ionicons 
                  name="arrow-back" 
                  size={24} 
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 15 }}
                />
              ),
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
