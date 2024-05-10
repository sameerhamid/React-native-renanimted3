import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const ShakeAnimation = () => {
  const shakeTranslateX = useSharedValue(0);
  const [count, setCount] = useState(0);

  const shake = useCallback((val: number) => {
    if (val < 0) {
      if (count <= 0) {
        setCount(0);
      } else {
        setCount((prevCount) => prevCount - 1);
      }
    } else {
      setCount((prevCount) => prevCount + 1);
    }

    const translateXVal = 70;
    shakeTranslateX.value = withSequence(
      withTiming(translateXVal),
      withRepeat(withTiming(-translateXVal), 3, true),
      withTiming(0)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeTranslateX.value }],
    };
  });
  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.counterTxt, animatedStyle]}>
        {count}
      </Animated.Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => shake(-1)}>
          <Text style={styles.btnTxt}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => shake(1)}>
          <Text style={styles.btnTxt}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShakeAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  counterTxt: {
    fontSize: 90,
    color: "red",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 20,
    flexDirection: "row",
    columnGap: 18,
  },
  button: {
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontSize: 30,
  },
});
