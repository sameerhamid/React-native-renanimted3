import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");
const STRIPE_WIDTH = width * 0.9;
const STRIPE_HEIGHT = 80;
const CIRCLE_SIZE = STRIPE_HEIGHT * 0.9;
const MAX_SLIDE_OFFSET = STRIPE_WIDTH - CIRCLE_SIZE;
const IphoneLockAnimation = () => {
  const translateX = useSharedValue(0);
  const onRight = useSharedValue(true);
  const [isLock, setIsLock] = useState(true);
  const derivedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, MAX_SLIDE_OFFSET), 0);
  });
  const textCompWidth = useSharedValue(0);
  const derivedWidth = useDerivedValue(() => {
    return Math.max(
      Math.min(textCompWidth.value, MAX_SLIDE_OFFSET - CIRCLE_SIZE / 2),
      0
    );
  });

  const pan = Gesture.Pan()
    .onChange((e) => {
      translateX.value = e.translationX;
      textCompWidth.value = translateX.value;
    })
    .onFinalize((e) => {
      translateX.value = withTiming(0);
      textCompWidth.value = withTiming(0);
      if (MAX_SLIDE_OFFSET <= e.translationX) {
        runOnJS(setIsLock)(false);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: derivedTranslateX.value }],
    };
  });
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: derivedWidth.value,
    };
  });

  return (
    <View style={styles.container}>
      {isLock ? (
        <View style={styles.stripe}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.circle, animatedStyle]} />
            </GestureDetector>

            <Text style={styles.text}>Swipe to right to unlock</Text>
            <Animated.View style={[styles.textTopView, textAnimatedStyle]} />
          </View>
        </View>
      ) : (
        <View style={styles.mainScreen}>
          <TouchableOpacity
            style={styles.lockBtn}
            onPress={() => setIsLock(true)}
          >
            <Text style={styles.lockBtnTxt}>Lock Screen</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default IphoneLockAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  stripe: {
    backgroundColor: "#ccc",
    width: STRIPE_WIDTH,
    height: STRIPE_HEIGHT,
    borderRadius: STRIPE_HEIGHT / 2,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#f7f2f2",
    opacity: 0.5,
    zIndex: 100,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    shadowRadius: 6,
  },
  textTopView: {
    height: STRIPE_HEIGHT,
    alignSelf: "flex-end",
    backgroundColor: "#ccc",
    position: "absolute",
    left: CIRCLE_SIZE,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgba(0,0,0,0.6)",
  },
  mainScreen: {
    flex: 1,
    backgroundColor: "#ccc",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  lockBtn: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: "teal",
    borderRadius: 10,
  },
  lockBtnTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
});
