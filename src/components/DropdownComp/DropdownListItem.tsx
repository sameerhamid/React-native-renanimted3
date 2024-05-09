import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Color from "color";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

type DropdownItemType = {
  label: string;
  iconName: string;
};
type DropdownListItemProps = DropdownItemType & {
  index: number;
  dropDownItemsCount: number;
  isExpanded?: Animated.SharedValue<boolean>; // shared value to check if list is collapse of expanded
};

const DropdownListItemHeight = 80; // item height

const DropdownListItem: React.FC<DropdownListItemProps> = ({
  label,
  iconName,
  index,
  dropDownItemsCount,
  isExpanded,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const Margin = 10; // margin for bottom
  const FullDropdownHeight =
    dropDownItemsCount * (DropdownListItemHeight + Margin); // total heiht of the dropdown
  const collapsedTop = DropdownListItemHeight - index * 10; // position from the top when in expand mode
  const expandedTop = (DropdownListItemHeight + Margin) * index; // position from the top when in collapse mode
  const expandedScale = 1; // scale size of the item when in expand mode
  const collapsedScale = 1 - index * 0.08; // scale size of the item when in collapse mode
  const expandedBackgroundColor = "#181818"; // background color of in expand mode

  // const clopassedBackgroundColor = `#10${index + 1}${0}${index + 2}0`; // calcualted background color in collapse mode
  const clopassedBackgroundColor = Color(expandedBackgroundColor)
    .lighten(index * 0.3)
    .hex(); // calcualted background color in collapse mode

  const reaniamtedStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop), // top position of items from screen on the basis of isCollapsed or isExpanded
      transform: [
        {
          scale: withSpring(isExpanded.value ? expandedScale : collapsedScale),
        },

        { translateY: DropdownListItemHeight }, // set the postion of the items
      ],
      backgroundColor: isExpanded.value
        ? expandedBackgroundColor
        : clopassedBackgroundColor,
    };
  });

  // check if the item is first item
  const isHeader = index === 0;

  // ------ left icon animated style

  const reanimatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: isHeader && isExpanded.value ? "90deg" : "0deg" }],
    };
  });

  // ------ right icon animated style

  const reAnimatedLeftIconOpacity = useAnimatedStyle(() => {
    return { opacity: withTiming(isHeader ? 1 : isExpanded.value ? 1 : 0) };
  }, [isHeader]);

  return (
    <Animated.View
      onTouchEnd={() => {
        isHeader && (isExpanded.value = !isExpanded.value);
      }}
      style={[
        {
          zIndex: dropDownItemsCount - index + 1,
          width: windowWidth * 0.95,
          height: DropdownListItemHeight,
          marginBottom: 10,
          borderRadius: 20,
          position: "absolute",
          top: collapsedTop,
        },
        reaniamtedStyle,
      ]}
    >
      <View style={styles.container}>
        <Text style={styles.label}> {label}</Text>
      </View>

      <Animated.View
        style={[styles.iconContainer, { left: 20 }, reAnimatedLeftIconOpacity]}
      >
        <AntDesign name={iconName as any} size={20} color={"#fff"} />
      </Animated.View>

      <Animated.View
        style={[
          styles.iconContainer,
          { right: 20, backgroundColor: "transparent" },
          reanimatedIconStyle,
        ]}
      >
        <AntDesign
          name={`${isHeader ? "right" : "arrowright"}`}
          size={20}
          color={"#fff"}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  iconContainer: {
    width: 45,
    backgroundColor: "#111",
    aspectRatio: 1,
    top: DropdownListItemHeight / 2 - 45 / 2, // cacluate the icon postion from to half of item height and half of own height

    position: "absolute",
    zIndex: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export { DropdownListItem };
export type { DropdownItemType };
