import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import LearnPinchGesture from "./src/Animations/LearnPinchGesture";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import DoubleTabLikeInstagramAnimation from "./src/Animations/DoubleTabLikeInstagramAnimation";
import ScrollAndPanGesture from "./src/Animations/ScrollAndPanGesture";
import WithDelayExample from "./src/Animations/WithDelayExample";
import ColorPicker from "./src/Animations/ColorPicker";
import CircularProgess from "./src/Animations/CircularPropress";
import ScrollAnimation from "./src/Animations/ScrollAnimation";
import AniamtedKeyboard from "./src/Animations/AniamtedKeyboard";
import SwipeToDelete from "./src/Animations/SwipeToDelete";
import RippleEffectAnimation from "./src/Animations/RipleEffectAnimation";
import PerspectiveMenueAnimation from "./src/Animations/PerspectiveMenueAnimation";
import SlidingCounter from "./src/Animations/SlidingCounter.tsx";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <LearnPinchGesture /> */}
        {/* <DoubleTabLikeInstagramAnimation /> */}

        {/* <ScrollAndPanGesture /> */}

        {/* <WithDelayExample /> */}

        {/* <ColorPicker /> */}

        {/* <CircularProgess /> */}

        {/* <ScrollAnimation /> */}

        {/* <AniamtedKeyboard /> */}

        {/* <SwipeToDelete /> */}

        {/* <RippleEffectAnimation /> */}

        {/* <PerspectiveMenueAnimation /> */}

        <SlidingCounter />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
