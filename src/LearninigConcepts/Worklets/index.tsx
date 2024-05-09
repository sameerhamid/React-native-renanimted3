import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { runOnJS, runOnUI } from "react-native-reanimated";

const Worklets = () => {
  const sayHello = () => {
    return "Hello";
  };

  const workletFunction = (city: string) => {
    "worklet"; // https://tech.groww.in/run-javascript-code-when-ui-thread-gets-updated-worklets-af7f2846549e
    console.log("City is ", city);
    try {
      const message = sayHello();
      console.log(message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onPress = () => {
    runOnUI(workletFunction)("Any city");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnTxt}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Worklets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "teal",
    paddingVertical: 22,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  btnTxt: {
    fontSize: 22,
    color: "white",
    fontWeight: "500",
  },
});
