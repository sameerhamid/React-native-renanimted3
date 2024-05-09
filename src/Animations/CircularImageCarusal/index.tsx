import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CircularCarusalComp from "../../components/CircularCarusalComp/index";

const data = [
  require("./../../assets/1.jpg"),
  require("./../../assets/2.jpg"),
  require("./../../assets/3.jpg"),
  require("./../../assets/4.jpg"),
  require("./../../assets/5.jpg"),
  require("./../../assets/6.jpg"),
  require("./../../assets/7.jpg"),
  require("./../../assets/1.jpg"),
  require("./../../assets/2.jpg"),
  require("./../../assets/3.jpg"),
];

const CircularImageCarusl = () => {
  return (
    <View style={styles.container}>
      <CircularCarusalComp data={data} />
    </View>
  );
};

export default CircularImageCarusl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
