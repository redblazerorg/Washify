import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import CARWASH_DATA from "../../data/carwash_location";

type RootStackParamList = {
  SelectedService: { service: string };
};

type SelectedServiceRouteProp = RouteProp<
  RootStackParamList,
  "SelectedService"
>;

const SelectedService = ({ route }: { route: SelectedServiceRouteProp }) => {
  const { service } = route.params; // Safely access the `service` parameter

  const filteredData = CARWASH_DATA.filter((carwash) =>
    carwash.services.some((s) => s.service === service)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Service: {service}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubTitle}>
              Location: {item.latitude}, {item.longitude}
            </Text>
            <Text style={styles.cardSubTitle}>Available Services:</Text>
            {item.services
              .filter((s) => s.service === service)
              .map((s, index) => (
                <Text key={index} style={styles.serviceText}>
                  - {s.service} | Price: ${s.price} | Duration: {s.duration} hrs
                </Text>
              ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardSubTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 14,
    color: "#333",
  },
});

export default SelectedService;
