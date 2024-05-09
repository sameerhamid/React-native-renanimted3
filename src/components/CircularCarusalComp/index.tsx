import {
  FlatList,
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CircularListItem, { ListItemWidth } from "./CircularListItem";
import { useSharedValue } from "react-native-reanimated";

type CircularCarusalCompProps = {
  data: ImageProps["source"][];
};
const CircularCarusalComp: React.FC<CircularCarusalCompProps> = ({ data }) => {
  const contentOffsetX = useSharedValue(0);
  return (
    <FlatList
      data={data}
      horizontal
      scrollEventThrottle={16}
      onScroll={(e) => {
        contentOffsetX.value = e.nativeEvent.contentOffset.x;
      }}
      style={[styles.flatList]}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, indx) => indx.toString()}
      pagingEnabled
      snapToInterval={ListItemWidth}
      renderItem={({ item, index }) => {
        return (
          <CircularListItem
            imageSrc={item}
            index={index}
            contentOffsetX={contentOffsetX}
          />
        );
      }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingRight: ListItemWidth * 3,
      }}
    />
  );
};

export default CircularCarusalComp;

const styles = StyleSheet.create({
  flatList: {
    position: "absolute",
    bottom: 0,
    height: 300,
  },
});
