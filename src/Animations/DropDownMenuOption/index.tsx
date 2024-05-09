import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropDownCom from "../../components/DropdownComp";
import { StatusBar } from "expo-status-bar";

const options = [
  { label: "Charts", iconName: "barschart" },
  { label: "Books", iconName: "book" },
  { label: "Calendar", iconName: "calendar" },
  { label: "Camers", iconName: "camera" },
  { label: "Charts", iconName: "barschart" },
  { label: "Charts", iconName: "barschart" },
  { label: "Books", iconName: "book" },
  { label: "Calendar", iconName: "calendar" },
  { label: "Camers", iconName: "camera" },
  { label: "Charts", iconName: "barschart" },
  { label: "Charts", iconName: "barschart" },
  { label: "Books", iconName: "book" },
  { label: "Calendar", iconName: "calendar" },
  { label: "Camers", iconName: "camera" },
  { label: "Charts", iconName: "barschart" },
];

const header = {
  label: "Header",
  iconName: "ellipsis1",
};

const DropDownmenuOption = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="light" />
      <DropDownCom header={header} options={options} />
    </View>
  );
};

export default DropDownmenuOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
    justifyContent: "center",
  },
});
