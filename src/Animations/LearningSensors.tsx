import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
} from "react-native-reanimated";

const LearningSensors = () => {
  const gravity = useAnimatedSensor(SensorType.GYROSCOPE);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: gravity?.sensor?.value?.x * 10 },
        { translateY: gravity?.sensor?.value?.y * 10 },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
    </View>
  );
};

export default LearningSensors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "teal",
    borderRadius: 20,
  },
});
