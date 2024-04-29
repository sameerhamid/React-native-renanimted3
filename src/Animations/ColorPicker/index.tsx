import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { BACKGROUN_COLOR, COLORS } from "../../assets/Colors";
import ColorPickerComp from "../../components/ColorPickerComp";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const PICKER_WIDTH = width * 0.8;
const CIRCLE_SIZE = width * 0.8;

const ColorPicker = () => {
  const backgroundColor = useSharedValue<string | number>(COLORS[0]);

  const handleChangeBackgroundColor = useCallback((color: number | string) => {
    "worklet";
    backgroundColor.value = color;
  }, []);

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return { backgroundColor: backgroundColor.value };
  });
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, circleAnimatedStyle]} />
      </View>
      <View style={[styles.bottomContainer]}>
        <ColorPickerComp
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={COLORS}
          style={[styles.linearGradient]}
          pickerWidth={PICKER_WIDTH}
          handleBackground={handleChangeBackgroundColor}
        />
      </View>
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUN_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    width: PICKER_WIDTH,
    height: 30,
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
  },
});
