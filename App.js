import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import LearningSensors from "./src/Animations/LearningSensors";
import ColorPickerComp from "./src/components/ColorPickerComp";
import ClockLoaderAnimation from "./src/Animations/ClockLoaderAnimation";
import MagicOfLayoutAnimation from "./src/Animations/MagicOfLayoutAnimation";
import IphoneLockAnimation from "./src/Animations/IphoneLockAnimation";
import Worklets from "./src/LearninigConcepts/Worklets";
import React from "react";
import TabOneScreen from "./src/Animations/BottomSheet";
import DropDownmenuOption from "./src/Animations/DropDownMenuOption";
import CircularImageCarusl from "./src/Animations/CircularImageCarusal";
import SkeltonAnimation from "./src/Animations/SkeltonAnimation";
import CustomSegmentedControll from "./src/Animations/CustomSegmentedControll";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
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

        {/* <SlidingCounter /> */}

        {/* <LearningSensors /> */}

        {/* <ClockLoaderAnimation /> */}

        {/* <MagicOfLayoutAnimation /> */}

        {/* <IphoneLockAnimation /> */}

        {/* <Worklets /> */}

        {/* <TabOneScreen /> */}
        {/* <DropDownmenuOption /> */}

        {/* <CircularImageCarusl /> */}

        {/* <SkeltonAnimation /> */}

        <CustomSegmentedControll />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 70,
  },
});
