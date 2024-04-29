import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SlidingCounterComp from "../../components/SlidingCounterComp";

const SlidingCounter = () => {
  return (
    <View style={styles.container}>
      <SlidingCounterComp />
    </View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
