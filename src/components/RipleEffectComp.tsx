import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface RipleEffectCompProps {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
}

const RipleEffectComp: React.FC<RipleEffectCompProps> = ({
  style,
  onTap,
  children,
}) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const animatedRef = useAnimatedRef();
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const rippleOpacity = useSharedValue(1);

  const pan = Gesture.Pan()
    .onBegin((e) => {
      //   console.log(e);
      rippleOpacity.value = 1;
      const layout = measure(animatedRef);
      width.value = layout.width;
      height.value = layout.height;

      scale.value = 0;
      centerX.value = e.x;

      centerY.value = e.y;
      scale.value = withTiming(1, { duration: 1000 });
    })
    .onFinalize((e, success) => {
      if (onTap) {
        runOnJS(onTap)?.();
      }
      //   console.log("before if");

      rippleOpacity.value = withTiming(0, { duration: 1000 });
    });

  const handleTapGestue =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (e) => {
        const layout = measure(animatedRef);
        width.value = layout.width;
        height.value = layout.height;
        centerX.value = e.x;
        centerY.value = e.y;
        scale.value = 0;
        scale.value = withTiming(1, { duration: 1000 });
      },
      onActive: () => {
        if (onTap) {
          runOnJS(onTap)?.();
        }
      },
    });

  const circleAnimtedStyle = useAnimatedStyle(() => {
    /* calculating the radious based on pythagorous theorem {
    radious is equal to the diameter of the square
        }*/
    const circleRadious = Math.sqrt(width.value ** 2 + height.value ** 2);
    // const circleRadious = 30;
    const translateX = centerX.value - circleRadious;
    const translateY = centerY.value - circleRadious;

    return {
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
      width: circleRadious * 2,
      height: circleRadious * 2,
      borderRadius: circleRadious,
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.2)",
      opacity: rippleOpacity.value * 5,
    };
  });
  return (
    <View ref={animatedRef} style={style}>
      <GestureDetector gesture={pan}>
        {/* <PanGestureHandler onGestureEvent={handleTapGestue}> */}
        <Animated.View style={[style, { overflow: "hidden" }]}>
          <View>{children}</View>
          <Animated.View style={[circleAnimtedStyle]} />
        </Animated.View>
        {/* </PanGestureHandler> */}
      </GestureDetector>
    </View>
  );
};

export default RipleEffectComp;

const styles = StyleSheet.create({
  cirlce: {
    // position: "absolute",
    // left: 0,
    // top: 0,
    // backgroundColor: "red",
    // opacity: 0.5,
    // width: 30,
    // height: 30,
    // borderRadius: 20,
  },
});
