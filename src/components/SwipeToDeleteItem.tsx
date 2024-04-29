import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TaskInterface } from "../Animations/SwipeToDelete";
import { Shadow } from "react-native-shadow-2";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
interface SwipeToDeleteItemProps {
  task: TaskInterface;
  onDeleteItem?: (task: TaskInterface) => void;
}

const ITEM_HEIGHT = 60;
const { width, height } = Dimensions.get("screen");
const TRANSLATE_X_THRUSHHOLD = -width * 0.2;

const TIME_TO_ACTIVATE_PAN = 100;
const SwipeToDeleteItem: React.FC<SwipeToDeleteItemProps> = ({
  task,
  onDeleteItem,
}) => {
  const translateX = useSharedValue(0);
  const constainerHeight = useSharedValue(ITEM_HEIGHT);
  const marginBottomCont = useSharedValue(20);

  const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });
  //   const derivedVal = useDerivedValue(() => {
  //     return Math.max(translateX.value, -(width * 0.5));
  //   });

  const pan = Gesture.Pan()
    .manualActivation(true)

    .onBegin((e) => {
      touchStart.value = {
        x: e.x,
        y: e.y,
        time: Date.now(),
      };
    })
    .onTouchesMove((e, state) => {
      const xDiff = Math.abs(e.changedTouches[0].x - touchStart.value.x);
      const yDiff = Math.abs(e.changedTouches[0].y - touchStart.value.y);
      const isHorizontalPanning = xDiff > yDiff;

      console.log(xDiff, "========", yDiff);
      // const timeToCheck = Date.now() - touchStart.value.time;

      // if (timeToCheck <= TIME_TO_ACTIVATE_PAN) {
      if (isHorizontalPanning) {
        state.activate();
      } else {
        state.fail();
      }
      // }

      // state.activate();
    })
    .onStart((e) => {
      translateX.value = e.translationX;
    })
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = e.translationX;
        // console.log(e.translationX);
      }
    })
    .onFinalize((e) => {
      if (translateX.value <= TRANSLATE_X_THRUSHHOLD) {
        translateX.value = withTiming(-width, { duration: 1000 });
        constainerHeight.value = withTiming(
          0,
          { duration: 1000 },
          (isFinished) => {
            if (isFinished && onDeleteItem) {
              runOnJS(onDeleteItem)(task);
            }
          }
        );
        marginBottomCont.value = withTiming(0, { duration: 1000 });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const deletBtnAnimationStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRUSHHOLD ? 1 : 0
    );

    return { opacity };
  });

  //   const panGesutre = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
  //     onStart: (e, ctx) => {
  //       ctx.x = translateX.value;
  //     },
  //     onActive(e, ctx) {
  //       translateX.value = e.translationX + ctx.x;
  //     },
  //   });

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: constainerHeight.value,
      marginBottom: marginBottomCont.value,
    };
  });
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });
  return (
    <Animated.View
      style={[
        styles.container,
        { marginTop: task.index === 0 ? 20 : 0 },
        containerStyle,
      ]}
    >
      <Animated.View style={[styles.iconContainer, deletBtnAnimationStyle]}>
        <FontAwesome5
          name={"trash-alt"}
          size={ITEM_HEIGHT * 0.5}
          color={"red"}
        />
      </Animated.View>
      {/* <Shadow distance={6} offset={[0, 2]}> */}
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.item, animatedStyle]}>
          <Text style={styles.itemTxt}>{task.title}</Text>
        </Animated.View>
      </GestureDetector>

      {/* </Shadow> */}
    </Animated.View>
  );
};

export default SwipeToDeleteItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // marginBottom: 22,
  },
  item: {
    width: width * 0.9,
    height: 60,

    backgroundColor: "white",
    paddingHorizontal: 18,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 4,
    borderRadius: 10,
  },
  itemTxt: {
    fontSize: 20,
  },
  iconContainer: {
    position: "absolute",
    right: "8%",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
  },
});
