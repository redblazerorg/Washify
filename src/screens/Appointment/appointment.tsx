import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAppointments } from "../../context/AppointmentContext";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CARWASH_DATA from '../../data/carwash_location';
// import appointments from "../../data/schedule";

const { width } = Dimensions.get("window");
const BAR_HEIGHT = 40;
const HOUR_WIDTH = (width - 40) / 24; // Scale for 24-hour view

const TaskTimeline = ({ task }: any) => {
  const barWidth = task.duration * HOUR_WIDTH;
  const marginLeft = task.startTime * HOUR_WIDTH;

  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineLabel}>
        <Text numberOfLines={1} style={styles.timelineLabelText}>
          {task.job_description}
        </Text>
      </View>
      <View style={styles.timelineBarContainer}>
        <View style={[styles.timelineBar, { width: barWidth, marginLeft }]}>
          <Text style={styles.timelineBarText}>{`${task.duration}h`}</Text>
        </View>
      </View>
    </View>
  );
};

const TaskCard = ({ task }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    try {
      // Get existing carwash data
      const carwashDataJson = await AsyncStorage.getItem('carwash_data');
      let carwashData = carwashDataJson ? JSON.parse(carwashDataJson) : CARWASH_DATA;

      // Find the carwash and add the review
      const carwashIndex = carwashData.findIndex((cw: any) => cw.id === task.carwash_id);
      
      if (carwashIndex !== -1) {
        const newReview = {
          user: user?.name || 'Anonymous',
          rating,
          comment,
          date: new Date().toISOString()
        };

        // Add the new review to the carwash's reviews array
        carwashData[carwashIndex].reviews.push(newReview);

        console.log('New review being added:', newReview);
        console.log('Updated carwash reviews:', carwashData[carwashIndex].reviews);
        
        // Save updated data back to AsyncStorage
        await AsyncStorage.setItem('carwash_data', JSON.stringify(carwashData));
        
        // Reset form and close modal
        setModalVisible(false);
        setRating(0);
        setComment('');
        alert('Review submitted successfully!');
      } else {
        alert('Could not find the carwash to review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  // const handleSubmitReview = async () => {
  //   if (rating === 0) {
  //     alert('Please select a rating');
  //     return;
  //   }

  //   try {
  //     // Get existing carwash data
  //     const carwashDataJson = await AsyncStorage.getItem('carwash_data');
  //     // console.log('Current carwash data:', carwashDataJson);

  //     let carwashData = carwashDataJson ? JSON.parse(carwashDataJson) : CARWASH_DATA;

  //     // Verify we have carwash_id
  //     // if (!task.carwash_id) {
  //     //   alert('Cannot find carwash ID for this task');
  //     //   console.log('Task missing carwash_id:', task);
  //     //   return;
  //     // }

  //     // Find the carwash and add the review
  //     const carwashIndex = carwashData.findIndex((cw: any) => cw.id === task.carwash_id);
  //     if (carwashIndex !== -1) {
  //       const newReview = {
  //         user: user?.name || 'Anonymous',
  //         rating,
  //         comment,
  //         date: new Date().toISOString()
  //       };

  //       carwashData[carwashIndex].reviews.push(newReview);
  //       await AsyncStorage.setItem('carwash_data', JSON.stringify(carwashData));
        
  //       setModalVisible(false);
  //       setRating(0);
  //       setComment('');
  //       alert('Review submitted successfully!');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting review:', error);
  //     alert('Failed to submit review');
  //   }
  // };

    const StarRating = () => (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
          >
            <Text style={[
              styles.starText,
              { color: star <= rating ? '#FFD700' : '#CCCCCC' }
            ]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );

    return (
      <View style={styles.taskCard}>
        <View style={styles.taskCardContent}>
          <View>
            <Text style={styles.taskTitle}>{task.job_description}</Text>
            <Text style={styles.taskDetail}>
              Duration: {task.duration}h | Deadline: {task.deadline}h
            </Text>
            <Text style={styles.taskDetail}>Laxity: {task.laxity}h</Text>
          </View>
          <View style={styles.taskTiming}>
            <Text style={styles.taskDetail}>Start: {task.startTime}h</Text>
            <Text style={styles.taskDetail}>End: {task.endTime}h</Text>
            <TouchableOpacity 
              style={styles.reviewButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.reviewButtonText}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Your Review</Text>
              <StarRating />
              <TextInput
                style={styles.input}
                placeholder="Write your review here..."
                multiline
                value={comment}
                onChangeText={setComment}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.submitButton]}
                  onPress={handleSubmitReview}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  

export default function Test() {
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const { appointments } = useAppointments();

  useEffect(() => {
    const scheduleLLF: any = () => {
      let time = 0;
      const tasks = [...appointments];
      const scheduled = [];

      while (tasks.length > 0) {
        tasks.forEach((task) => {
          task.laxity = task.deadline - (time + task.duration); //convert to minutes
        });

        tasks.sort((a, b) => a.laxity - b.laxity);

        scheduled.push({
          ...tasks[0],
          startTime: time,
          endTime: time + tasks[0].duration,
        });

        time += tasks[0].duration;
        tasks.splice(0, 1);
      }

      return scheduled;
    };

    setScheduledTasks(scheduleLLF());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>LLF Scheduler</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule Timeline</Text>
          <View style={styles.timeline}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {scheduledTasks.map((task: any) => (
                  <TaskTimeline key={task.id} task={task} />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Task Details</Text>
          {scheduledTasks.map((task: any) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    backgroundColor: "white",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  timeline: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    height: BAR_HEIGHT,
    marginVertical: 5,
  },
  timelineLabel: {
    width: 100,
    paddingRight: 10,
  },
  timelineLabelText: {
    fontSize: 12,
  },
  timelineBarContainer: {
    width: width * 2, // Allow scrolling for longer schedules
    height: BAR_HEIGHT,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  timelineBar: {
    height: BAR_HEIGHT,
    backgroundColor: "#4f46e5",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineBarText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  taskCard: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskCardContent: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  taskDetail: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  taskTiming: {
    alignItems: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#4f46e5',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  reviewButton: {
    backgroundColor: '#4f46e5',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 12,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  starText: {
    fontSize: 30,
    marginHorizontal: 2,
  }
});
