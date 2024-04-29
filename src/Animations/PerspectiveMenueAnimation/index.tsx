import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { BACKGROUN_COLOR } from "../../assets/Colors";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const THRESHOLD = SCREEN_WIDTH / 3;
const PerspectiveMenueAnimation = () => {
  const translateX = useSharedValue(0);

  const pan = Gesture.Pan().onUpdate((e) => {
    console.log(e.translationX);

    translateX.value = e.translationX;
  });

  const handleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_e, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: (e, ctx) => {
      translateX.value = e.translationX + ctx.x;
    },
    onFinish: (e) => {
      if (e.translationX <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [
        // borderRadious,
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: `-${rotate}deg` },
      ],
    };
  });

  const handleMenuPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(SCREEN_WIDTH / 2);
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {/* <GestureDetector gesture={pan}> */}
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style={[styles.page, animatedStyle]}>
          <Feather
            size={30}
            color={BACKGROUN_COLOR}
            name="menu"
            style={{ margin: 20 }}
            onPress={handleMenuPress}
          />
        </Animated.View>
      </PanGestureHandler>
      {/* </GestureDetector> */}
    </SafeAreaView>
  );
};

export default PerspectiveMenueAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
