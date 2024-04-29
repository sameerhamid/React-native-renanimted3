import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RipleEffectComp from "../../components/RipleEffectComp";

const RippleEffectAnimation = () => {
  return (
    <View style={styles.container}>
      <RipleEffectComp
        style={styles.riple}
        onTap={() => {
          // console.log("abc");
        }}
      >
        <Text style={{ fontSize: 30 }}>TAP</Text>
      </RipleEffectComp>
    </View>
  );
};

export default RippleEffectAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  riple: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 10,
  },
});
