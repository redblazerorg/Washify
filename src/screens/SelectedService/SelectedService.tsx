import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import CARWASH_DATA from "../../data/carwash_location";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  SelectedService: { service: string };
};

type SelectedServiceRouteProp = RouteProp<
  RootStackParamList,
  "SelectedService"
>;

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={16}
          color={star <= rating ? "#FFD700" : "#CCCCCC"}
        />
      ))}
    </View>
  );
};

const SelectedService = ({ route }: { route: SelectedServiceRouteProp }) => {
  const { service } = route.params;
  const [carwashData, setCarwashData] = useState(CARWASH_DATA);

  useEffect(() => {
    const loadCarwashData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('carwash_data');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setCarwashData(parsedData);
          console.log('Loaded carwash data from storage:', parsedData);
        }
      } catch (error) {
        console.error('Error loading carwash data:', error);
      }
    };

    loadCarwashData();
  }, []); // Load when component mounts

  const filteredData = carwashData.filter((carwash) =>
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
            
            {/* Reviews Section */}
            <View style={styles.reviewsSection}>
              <Text style={styles.reviewsTitle}>Customer Reviews</Text>
              {item.reviews.length > 0 ? (
                item.reviews.map((review, index) => (
                  <View key={index} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewUser}>{review.user}</Text>
                      <StarRating rating={review.rating} />
                    </View>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                    {/* {review.date && (
                      <Text style={styles.reviewDate}>
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                    )} */}
                  </View>
                ))
              ) : (
                <Text style={styles.noReviews}>No reviews yet</Text>
              )}
            </View>
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
    marginBottom: 8,
  },
  reviewsSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  reviewItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    fontStyle: "italic",
  },
  noReviews: {
    fontStyle: "italic",
    color: "#999",
  },
  starContainer: {
    flexDirection: "row",
    gap: 2,
  }
});

export default SelectedService;