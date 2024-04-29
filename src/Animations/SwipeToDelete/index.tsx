import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import SwipeToDeleteItem from "../../components/SwipeToDeleteItem";

const ITEMS = [
  "This is the 1 item 🐹",
  "This is the 2 item 🐱",
  "This is the 3 item 🐭",
  "This is the 4 item 🐝",
  "This is the 5 item 😀",
  "This is the 6 item 😍",
  "This is the 1 item 🐹",
  "This is the 2 item 🐱",
  "This is the 3 item 🐭",
  "This is the 4 item 🐝",
  "This is the 5 item 😀",
  "This is the 6 item 😍",
];

export interface TaskInterface {
  title: string;
  index: number;
}
const TASKS: TaskInterface[] = ITEMS.map((title, index) => ({
  title,
  index,
}));

const BACKGROUND_COLOR = "#FAFBFF";
const SwipeToDelete = () => {
  const [tasks, setTasks] = useState(TASKS);
  const handleDeleteItem = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <Text style={styles.title}>Tasks</Text>

      <ScrollView style={{ flex: 1 }}>
        {tasks.map((task) => (
          <SwipeToDeleteItem
            task={task}
            key={task.index}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwipeToDelete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
