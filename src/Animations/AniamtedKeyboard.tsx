import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

const AniamtedKeyboard = () => {
  const keyboard = useAnimatedKeyboard();

  const translateStyle = useAnimatedStyle(() => {
    console.log(keyboard);
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={translateStyle}>
        <TextInput style={{ borderWidth: 1, width: 100 }} />
      </Animated.View>
    </ScrollView>
  );
};

export default AniamtedKeyboard;

const styles = StyleSheet.create({});
