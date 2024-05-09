import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Palatte } from "../assets/Colors";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SegmentedControllProps = {
  options: string[];
  selectedOption: string;
  onOptionPress: (option: number) => void;
};

const { width: windowWidth } = Dimensions.get("window");
const SegmentedControllWidth = windowWidth - 40;

const SegmentedControll: React.FC<SegmentedControllProps> = ({
  options,
  selectedOption,
  onOptionPress,
}) => {
  const ItemWidth = SegmentedControllWidth / options.length;
  const WIDTH_MINUS_CONSTANT = 20;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        ItemWidth * options.indexOf(selectedOption) + WIDTH_MINUS_CONSTANT / 2,
        {
          duration: 200,
        }
      ),
    };
  }, [selectedOption, options, ItemWidth]);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          animatedStyle,
          styles.activeItem,
          {
            width: ItemWidth - WIDTH_MINUS_CONSTANT,
          },
        ]}
      />
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            key={option}
            style={[styles.item, { width: ItemWidth }]}
            onPress={() => onOptionPress(index)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SegmentedControll;

const styles = StyleSheet.create({
  container: {
    width: SegmentedControllWidth,
    height: 60,
    backgroundColor: Palatte.baseGrey05,
    flexDirection: "row",
    borderRadius: 20,

    alignItems: "center",
  },
  item: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  activeItem: {
    backgroundColor: "#fff",
    position: "absolute",
    height: 44,
    borderRadius: 10,
  },
});
