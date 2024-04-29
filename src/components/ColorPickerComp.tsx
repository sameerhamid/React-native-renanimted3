import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { BACKGROUN_COLOR } from "../assets/Colors";

const CIRCLE_PICKER_SIZE = 35;
const INTERNAL_CIRCLE_PICKER_SIZE = CIRCLE_PICKER_SIZE / 1.6;
interface ColorPickerCompProp extends LinearGradientProps {
  pickerWidth: number;
  handleBackground: (color: string | number) => void;
}

const ColorPickerComp = (props: ColorPickerCompProp) => {
  const { colors, style, start, end, pickerWidth, handleBackground } = props;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const deriveTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      pickerWidth - CIRCLE_PICKER_SIZE
    );
  });

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: deriveTranslateX.value },
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });

  const animatedInterCircle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * pickerWidth
    );
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors
    );

    handleBackground(backgroundColor);
    return { backgroundColor };
  });
  const pan = useAnimatedGestureHandler<PanGestureHandlerStateChangeEvent>({
    onActive: (e) => {
      translateX.value = e.x - CIRCLE_PICKER_SIZE;
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      scale.value = withTiming(1.2, { duration: 100 });
    },
    onEnd: () => {
      scale.value = withSpring(1, { duration: 100 });
      translateY.value = withTiming(0, { duration: 100 });
    },
  });

  const handleTapGesture =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (e) => {
        translateX.value = e.x - CIRCLE_PICKER_SIZE;
        translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
        scale.value = withTiming(1.2, { duration: 100 });
      },
      onEnd: () => {
        scale.value = withSpring(1, { duration: 100 });
        translateY.value = withTiming(0, { duration: 100 });
      },
    });

  return (
    // <GestureDetector>

    <TapGestureHandler onGestureEvent={handleTapGesture}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={pan}>
          <Animated.View style={[styles.container]}>
            <LinearGradient
              start={start}
              end={end}
              colors={colors}
              style={style}
            />
            <Animated.View style={[styles.circle, animatedCircleStyle]}>
              <Animated.View
                style={[styles.internalCircle, animatedInterCircle]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>

    // </GestureDetector>
  );
};

export default ColorPickerComp;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  internalCircle: {
    width: INTERNAL_CIRCLE_PICKER_SIZE,
    height: INTERNAL_CIRCLE_PICKER_SIZE,
    borderRadius: INTERNAL_CIRCLE_PICKER_SIZE / 2,
    borderColor: BACKGROUN_COLOR,
    borderWidth: 1,
  },
});
