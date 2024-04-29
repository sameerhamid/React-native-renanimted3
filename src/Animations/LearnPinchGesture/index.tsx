import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { IMAGES } from "../../assets/Images";

const { width, height } = Dimensions.get("screen");
const imageUrl = require("../../assets/PinchImage.jpg");

const AnimatedImage = Animated.createAnimatedComponent(Image);

const LearnPinchGesture = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const handlePinchGesture = Gesture.Pinch()
    .onBegin((e) => {
      console.log(e);
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onChange((e) => {
      scale.value = e.scale;
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onFinalize(() => {
      scale.value = withTiming(1);
      focalX.value = withTiming(0);
      focalY.value = withTiming(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },

        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <GestureDetector gesture={handlePinchGesture}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage
          source={IMAGES.PINCHIMAGE}
          style={[{ width, height }, animatedStyle]}
        />
        <Animated.View style={[styles.circle, focalPointStyle]} />
      </Animated.View>
    </GestureDetector>
  );
};

export default LearnPinchGesture;

const styles = StyleSheet.create({
  circle: {
    ...StyleSheet.absoluteFillObject,
    width: 30,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 20,
  },
});
