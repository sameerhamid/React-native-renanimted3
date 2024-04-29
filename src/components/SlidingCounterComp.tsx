import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const ICON_SIZE = 30;
const STRIPE_WIDTH = 200;
const STRIPE_HEIGHT = 80;
const CIRCLE_SIZE = STRIPE_HEIGHT * 0.8;
const MAX_SLIDE_OFFSET = STRIPE_WIDTH / 2 - CIRCLE_SIZE / 2;

const clamp = (value: number, minVal: number, maxVal: number): number => {
  "worklet";
  return Math.max(Math.min(value, maxVal), -minVal);
};

const SlidingCounterComp = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((currentCount) => currentCount + 1);
  }, []);
  const decrement = useCallback(() => {
    setCount((currentCount) => currentCount - 1);
  }, []);
  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const pan = Gesture.Pan()
    .onBegin((e) => {})
    .onChange((e) => {
      translateX.value = clamp(
        e.translationX,
        MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET
      );
      translateY.value = clamp(e.translationY, 0, CIRCLE_SIZE);
    })
    .onFinalize((e) => {
      if (e.translationY >= CIRCLE_SIZE) {
        runOnJS(resetCount)();
      } else if (e.translationX >= MAX_SLIDE_OFFSET) {
        runOnJS(increment)();
      } else if (e.translationX <= -MAX_SLIDE_OFFSET) {
        runOnJS(decrement)();
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const iconAniamtedStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.6, 1, 0.6]
    );
    const opacityY = interpolate(translateY.value, [0, CIRCLE_SIZE], [1, 0]);
    return { opacity: opacityX * opacityY };
  });
  const closeInconAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, CIRCLE_SIZE], [0, 1]);
    return { opacity };
  });

  const striptAnaimtedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value * 0.1 }] };
  });
  return (
    <Animated.View style={[styles.container, striptAnaimtedStyle]}>
      <Animated.View style={[iconAniamtedStyle]}>
        <AntDesign name="minus" size={ICON_SIZE} color="white" />
      </Animated.View>

      <Animated.View style={[closeInconAnimatedStyle]}>
        <AntDesign name="close" size={ICON_SIZE} color="white" />
      </Animated.View>

      <Animated.View style={[iconAniamtedStyle]}>
        <AntDesign name="plus" size={ICON_SIZE} color="white" />
      </Animated.View>

      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.circle, animatedStyle]}>
            <Text style={styles.txtStyle}>{count}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
};

export default SlidingCounterComp;

const styles = StyleSheet.create({
  container: {
    width: STRIPE_WIDTH,
    height: STRIPE_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 40,
  },
  circle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: "#696464",
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  txtStyle: {
    fontSize: CIRCLE_SIZE * 0.4,
    color: "white",
  },
});
