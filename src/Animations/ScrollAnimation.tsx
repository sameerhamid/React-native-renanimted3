import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";

const ITEM_COUNT = 10;
const ITEM_SIZE = 100;
const ITEM_MARGIN = 10;
const { height, width } = Dimensions.get("screen");

const ScrollAnimation = () => {
  const animatedRef = useAnimatedRef();
  const scrollY = useSharedValue(0);

  const scrollOffset = useScrollViewOffset(animatedRef);

  const handlIncrement = (increment: number) => {
    // scrollY.value =
    //   scrollY.value + increment > 0
    //     ? scrollY.value + increment
    //     : ITEM_COUNT - 1 + increment;

    // if (scrollY.value >= ITEM_COUNT - 2) scrollY.value = 0;

    if (increment === -1) {
      scrollY.value = scrollY.value - (ITEM_SIZE + ITEM_MARGIN);
    } else {
      scrollY.value = scrollY.value + (ITEM_SIZE + ITEM_MARGIN);
    }
  };

  const handleScroll = () => {
    console.log(scrollOffset.value);
  };

  const Increment = ({ title, increment, scrollY }) => {
    return (
      <TouchableOpacity
        onPress={() => handlIncrement(increment)}
        style={styles.btn}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };

  const items = Array.from(Array(ITEM_COUNT).keys());

  return (
    <View style={styles.container}>
      {/* <Increment title="UP" increment={-1} scrollY={scrollY} /> */}

      <View style={styles.boxWrapper}>
        <Animated.ScrollView ref={animatedRef} onScroll={handleScroll}>
          {items.map((_, i) => {
            return (
              <View key={i} style={styles.box}>
                <Text>Item {i}</Text>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>

      {/* <Increment title="DOWN" increment={1} scrollY={scrollY} /> */}
    </View>
  );
};

export default ScrollAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    margin: ITEM_MARGIN,
    borderRadius: 10,
  },

  boxWrapper: {
    width: "100%",
    height: height / 3,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "rgba(100,200,100,0.9)",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
