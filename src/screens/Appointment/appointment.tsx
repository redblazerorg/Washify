import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width } = Dimensions.get("window");
const BAR_HEIGHT = 40;
const HOUR_WIDTH = (width - 40) / 24; // Scale for 24-hour view

const appointments = [
  {
    id: 1,
    job_description: "washing windows",
    price: 10,
    duration: 2,
    deadline: 5,
    laxity: 0,
  },
  {
    id: 2,
    job_description: "washing car",
    price: 40,
    duration: 3,
    deadline: 8,
    laxity: 0,
  },
  {
    id: 3,
    job_description: "washing interior",
    price: 70,
    duration: 4,
    deadline: 10,
    laxity: 0,
  },
  {
    id: 4,
    job_description: "mowing lawn",
    price: 50,
    duration: 3,
    deadline: 7,
    laxity: 0,
  },
  {
    id: 5,
    job_description: "cleaning pool",
    price: 60,
    duration: 5,
    deadline: 9,
    laxity: 0,
  },
];

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

const TaskCard = ({ task }: any) => (
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
      </View>
    </View>
  </View>
);

export default function App() {
  const [scheduledTasks, setScheduledTasks] = useState([]);

  useEffect(() => {
    const scheduleLLF: any = () => {
      let time = 0;
      const tasks = [...appointments];
      const scheduled = [];

      while (tasks.length > 0) {
        tasks.forEach((task) => {
          task.laxity = task.deadline - (time + task.duration);
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
});
