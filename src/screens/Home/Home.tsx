import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { ItemEnum, ServiceType } from "../../utils/enum";

// Define the enum for your items

const Home = ({ navigation }: { navigation: any }) => {
  const width = Dimensions.get("window").width;

  const services = [
    {
      key: "CAR_WASH",
      title: "Car Wash",
      icon: "car-sport-outline",
      color: "#007AFF",
    },
    {
      key: "CAR_POLISH",
      title: "Car Polish",
      icon: "color-palette-outline",
      color: "#007AFF",
    },
    {
      key: "INTERIOR_WASH",
      title: "Interior Wash",
      icon: "water-outline",
      color: "#007AFF",
    },
    {
      key: "CAR_SERVICE",
      title: "Car Service",
      icon: "construct-outline",
      color: "#007AFF",
    },
    {
      key: "TYRE_CARE",
      title: "Tyre Care",
      icon: "speedometer-outline",
      color: "#007AFF",
    },
  ];

  const [openFloatingLocation, setOpenFloatingLocation] =
    useState<boolean>(false);

  const handleAvailableLocation = () => {
    setOpenFloatingLocation(!openFloatingLocation);
  };

  const ServiceCard = ({ title, icon, color, onPress }: any) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        marginVertical: 10,
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 50,
          marginRight: 16,
        }}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={{ flex: 1, fontSize: 16, color: "#333" }}>{title}</Text>
      <Text
        style={{
          fontSize: 24,
          color: "#888",
        }}
      >
        &rarr;
      </Text>
    </TouchableOpacity>
  );

  const handlePress = (service: string) => {
    navigation.navigate("SelectedService", { service });
  };

  return (
    <TouchableWithoutFeedback
      accessible={false}
      onPress={() => {
        if (openFloatingLocation) setOpenFloatingLocation(false);
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 16,
        }}
      >
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Hello,
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#666",
            }}
          >
            Choose one of our Services
          </Text>
        </View>
        <FlatList
          data={services}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <ServiceCard
              title={item.title}
              icon={item.icon}
              color={item.color}
              onPress={() => handlePress(item.title)}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: 15,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 15,
          }}
        >
          <TouchableOpacity onPress={() => handleAvailableLocation()}>
            <Ionicons name="settings" size={30} color="#007AFF" />
          </TouchableOpacity>
        </View>
        {openFloatingLocation && (
          <View style={styles.floatingCard}>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: width * 0.35,
                alignSelf: "flex-end",
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
              }}
            >
              {Object.values(ItemEnum).map((e, index) => (
                <View key={index}>
                  {(() => {
                    switch (e) {
                      // case ItemEnum.Home:
                      //   return (
                      //     <View
                      //       style={{
                      //         paddingVertical: 10,
                      //         alignItems: "center",
                      //       }}
                      //     >
                      //       <Ionicons
                      //         onPress={() => {}}
                      //         name="star"
                      //         size={24}
                      //         color="#007AFF"
                      //       />
                      //       <Text>Unknown</Text>
                      //     </View>
                      //   );
                      case ItemEnum.Profile:
                        return (
                          <View
                            style={{
                              paddingVertical: 10,
                              alignItems: "center",
                            }}
                          >
                            <Ionicons
                              onPress={() => {
                                navigation.navigate("Profile");
                              }}
                              name="person"
                              size={24}
                              color="#007AFF"
                            />
                            <Text>Profile</Text>
                          </View>
                        );
                      case ItemEnum.Location:
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("LocationAvailability");
                            }}
                          >
                            <View
                              style={{
                                paddingVertical: 10,
                                alignItems: "center",
                              }}
                            >
                              <Ionicons
                                name="location"
                                size={24}
                                color="#007AFF"
                              />
                              <Text>Location</Text>
                            </View>
                          </TouchableOpacity>
                        );
                      case ItemEnum.Appointment:
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("Appointment");
                            }}
                          >
                            <View
                              style={{
                                paddingVertical: 10,
                                alignItems: "center",
                              }}
                            >
                              <Ionicons
                                name="business"
                                size={24}
                                color="#007AFF"
                              />
                              <Text>Appointment</Text>
                            </View>
                          </TouchableOpacity>
                        );
                      default:
                        return (
                          <Ionicons name="help-circle" size={24} color="gray" />
                        );
                    }
                  })()}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  floatingCard: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // backgroundColor: "red",
    backgroundColor: "rgba(52, 52, 52, 0.01)",
    // opacity: 0.5,
  },
});

export default Home;
