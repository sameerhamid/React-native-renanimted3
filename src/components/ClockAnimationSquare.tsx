import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { N, SQURARE_SIZE } from "../Animations/ClockLoaderAnimation/constants";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface ClockAnimationSquareProps {
  index: number;
  progress: Animated.SharedValue<number>;
}

const ClockAnimationSquare: React.FC<ClockAnimationSquareProps> = ({
  index,
  progress,
}) => {
  const offsetAngel = (2 * Math.PI) / N;
  const finalAngle = offsetAngel * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }

    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);
  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQURARE_SIZE);
    }
    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQURARE_SIZE);
    }
    return withTiming(-index * SQURARE_SIZE);
  });
  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}rad` },
        { translateY: translateY.value },
      ],
    };
  });

  return <Animated.View style={[styles.squar, circleAnimatedStyle]} />;
};

export default ClockAnimationSquare;

const styles = StyleSheet.create({
  squar: {
    width: SQURARE_SIZE,
    height: SQURARE_SIZE,
    backgroundColor: "white",
    position: "absolute",
  },
});
