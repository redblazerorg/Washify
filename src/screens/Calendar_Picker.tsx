import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as Calendar from "expo-calendar";
import DateTimePicker from "@react-native-community/datetimepicker";

const CalendarPicker = ({ onDateChange, initialDate, style }: any) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        console.log("Calendar permission not granted");
      }
    })();
  }, []);

  const getValidDateRange = () => {
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 1);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 10);
    return { minDate, maxDate };
  };

  const { minDate, maxDate } = getValidDateRange();

  const onChange = (event: any, date: any) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      // Call the parent's callback with the selected date and days difference
      onDateChange({
        date: date,
        daysDifference: getDaysDifference(date),
      });
    }
  };

  const getDaysDifference = (date: any) => {
    if (!date) return null;
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <View style={[styles.container, style]}>
      {showPicker && (
        <DateTimePicker
          value={selectedDate || minDate}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <View
            style={{
              backgroundColor: "#007AFF",
              borderRadius: 12,
              width: 100,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Select Date
            </Text>
          </View>
        </TouchableOpacity>
        {selectedDate && (
          <View
            style={{
              marginLeft: 10,
              flexDirection: "column",
            }}
          >
            <Text style={{ fontSize: 16, color: "#000" }}>
              Selected Date: {selectedDate.toLocaleDateString()}
            </Text>
            <Text style={{ fontSize: 14, color: "#666" }}>
              Days from today: {getDaysDifference(selectedDate)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 5,
  },
  daysText: {
    fontSize: 16,
    color: "#666",
  },
});

export default CalendarPicker;
