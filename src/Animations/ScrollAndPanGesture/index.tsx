import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import ScrollAndPanGestureComponent from "../../components/ScrollAndPanGestureComponent";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { WIDTH } from "../../components/ScrollAndPanGestureComponent";

const items = ["item_1", "item_2", "item_3", "item_4"];
const MAX_SCROLL = WIDTH * (items.length - 1);
let prevVal = 0;
const ScrollAndPanGesture = () => {
  const translateX = useSharedValue(0);

  const derivedTranslateX = useDerivedValue(() => {
    // console.log(Math.max(Math.min(translateX.value, 0), -MAX_SCROLL));
    return Math.max(Math.min(translateX.value, 0), -MAX_SCROLL);
  });

  let previousTranslationX = 0;

  const pan = Gesture.Pan()
    .onBegin(() => {
      previousTranslationX = translateX.value;
    })
    .onChange((e) => {
      //   translateX.value = scrollRef.current;
      //   console.log("event value", e.translationX);
      //   console.log("sharedValue", translateX.value);

      translateX.value = e.translationX + previousTranslationX;
    })
    .onFinalize((e) => {
      translateX.value = withDecay({ velocity: e.velocityX });
      prevVal = e.velocityX;
      //   translateX.value = e.translationX;
    });

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      // Store the current translateX value when the gesture begins
      ctx.translateXOffset = translateX.value;
    },
    onActive: (event, ctx) => {
      // Update translateX based on the accumulated translation
      translateX.value = event.translationX + ctx.translateXOffset;
    },
    onEnd: (event) => {
      // Continue the animation using withDecay with the velocity
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {items.map((title, index) => {
            return (
              <ScrollAndPanGestureComponent
                title={title}
                index={index}
                key={title}
                translateX={derivedTranslateX}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ScrollAndPanGesture;

const styles = StyleSheet.create({});
