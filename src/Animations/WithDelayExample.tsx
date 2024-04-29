import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const DELAY = 500;
const DURATION = 1000;

const text = ["React", "Native", "Reanimated"];

const WithDelayExample = () => {
  const [show, setShow] = useState(false);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);

  const handleOpacity = () => {
    if (show) {
      opacity3.value = withDelay(
        0 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      opacity2.value = withDelay(
        1 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      opacity1.value = withDelay(
        2 * DELAY,
        withTiming(0, { duration: DURATION })
      );
    } else {
      opacity1.value = withDelay(
        0 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacity2.value = withDelay(
        1 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacity3.value = withDelay(
        2 * DELAY,
        withTiming(1, { duration: DURATION })
      );
    }
    setShow(!show);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.Text style={{ ...styles.text, opacity: opacity1 }}>
          {text[0]}
        </Animated.Text>
        <Animated.Text style={[styles.text, { opacity: opacity2 }]}>
          {text[1]}
        </Animated.Text>
        <Animated.Text style={[styles.text, { opacity: opacity3 }]}>
          {text[2]}
        </Animated.Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleOpacity}>
        <Text>{show ? "Hide" : "Show"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithDelayExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#ccc",
  },
  textContainer: {
    flexDirection: "row",
    columnGap: 12,
  },
});
