import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const LIST_ITEM_COLOR = "#179BDE";
interface Item {
  id: number;
}

const listItems: Item[] = new Array(4)
  .fill(0)
  .map((_, index) => ({ id: index }));

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = width * 0.2;

const MagicOfLayoutAnimation = () => {
  const [items, setItems] = useState<Item[]>(listItems);

  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);
  const onAdd = useCallback(() => {
    setItems((prev) => {
      const nextItem =
        prev.length > 0 ? { id: prev[prev.length - 1].id + 1 } : { id: 0 };

      console.log(nextItem);

      return [...prev, nextItem];
    });
  }, []);

  const onDelete = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <Text style={styles.floatingBtnTxt}>+</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((item, index) => (
          <Animated.View
            style={styles.listItem}
            key={item.id}
            entering={initialMode.current ? FadeIn.delay(100 * index) : FadeIn}
            onTouchEnd={() => onDelete(item.id)}
            exiting={FadeOut}
            layout={Layout.delay(100)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MagicOfLayoutAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    marginTop: 22,
    marginBottom: 22,
    flex: 1,
    rowGap: 20,
    alignItems: "center",
  },
  listItem: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: LIST_ITEM_COLOR,
    borderRadius: 20,
    elevation: 5,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowColor: "black",
  },
  floatingButton: {
    width: 80,
    height: 80,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: ITEM_WIDTH * 0.05,
    borderRadius: 40,
    zIndex: 1000,
  },
  floatingBtnTxt: {
    fontSize: 44,
    color: "white",
    // backgroundColor: "red",
    lineHeight: 44,
  },
});
