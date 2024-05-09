import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import ClockAnimationSquare from "../../components/CircularCarusalComp";
import { N } from "./constants";
import Animated, {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const ClockLoaderAnimation = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1
    );
  });
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      {new Array(N).fill(0).map((_, index) => {
        return (
          <ClockAnimationSquare index={index} key={index} progress={progress} />
        );
      })}
    </View>
  );
};

export default ClockLoaderAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
});
