import {
  Dimensions,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Animated, {
  clamp,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
type CircularListItemProps = {
  imageSrc: ImageProps["source"];
  index?: number;
  contentOffsetX: Animated.SharedValue<number>;
};

const { width: screenWidth } = Dimensions.get("screen");
export const ListItemWidth = screenWidth / 4;

const CircularListItem: React.FC<CircularListItemProps> = ({
  imageSrc,
  index,
  contentOffsetX,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      contentOffsetX.value,
      [
        (index - 2) * ListItemWidth,
        (index - 1) * ListItemWidth,
        index * ListItemWidth,
        (index + 1) * ListItemWidth,
        (index + 2) * ListItemWidth,
      ],
      [0, -ListItemWidth / 3, -ListItemWidth / 2, -ListItemWidth / 3, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { translateY },
        { translateX: ListItemWidth / 2 + ListItemWidth },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          marginRight: 10,
        },
        animatedStyle,
      ]}
    >
      <Image
        source={imageSrc}
        style={{
          width: ListItemWidth,
          height: ListItemWidth,
          overflow: "hidden",
          borderRadius: ListItemWidth / 2,
        }}
      />
    </Animated.View>
  );
};

export default CircularListItem;

const styles = StyleSheet.create({});
