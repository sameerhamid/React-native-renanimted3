import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface ScrollAndPanGestureContainerProps {
  title?: string;
  index?: number;
  translateX?: Animated.SharedValue<number>;
}

export const WIDTH = Dimensions.get("screen").width;

const ScrollAndPanGestureComponent = (
  props: ScrollAndPanGestureContainerProps
) => {
  const { title, index, translateX } = props;
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });
  return (
    <Animated.View
      style={[
        styles.pageContianer,
        { backgroundColor: `rgba(0,0,255,0.${index + 2})` },
        animatedStyle,
      ]}
    >
      <Text>{title}</Text>
    </Animated.View>
  );
};

export default ScrollAndPanGestureComponent;

const styles = StyleSheet.create({
  pageContianer: {
    width: WIDTH,
    height: Dimensions.get("screen").height,
  },
});
