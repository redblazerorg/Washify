import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Platform } from "react-native";
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
      <Button title="Select Date" onPress={() => setShowPicker(true)} />

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

      {selectedDate && (
        <View style={styles.resultContainer}>
          <Text style={styles.dateText}>
            Selected Date: {selectedDate.toLocaleDateString()}
          </Text>
          <Text style={styles.daysText}>
            Days from today: {getDaysDifference(selectedDate)}
          </Text>
        </View>
      )}
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
