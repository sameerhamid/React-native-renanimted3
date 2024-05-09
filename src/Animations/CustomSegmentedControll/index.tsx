import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import SegmentedControll from "../../components/SegmentedControll";
import { Palatte } from "../../assets/Colors";

const options = ["Option1", "Option2", "Option3"];

const CustomSegmentedControll = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptonPress = (index: number): void => {
    console.log(index);
    setSelectedOption(options[index]);
  };
  return (
    <View style={styles.container}>
      <SegmentedControll
        options={options}
        selectedOption={selectedOption}
        onOptionPress={handleOptonPress}
      />
    </View>
  );
};

export default CustomSegmentedControll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Palatte.background,
  },
});
