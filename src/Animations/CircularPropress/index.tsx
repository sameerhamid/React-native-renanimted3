import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { CircularProgressColors } from "../../assets/Colors";
import { Circle, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

const { width, height } = Dimensions.get("screen");

const CIRCLE_LENGTH = height;

const RADIOUS = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CircularProgess = () => {
  const progress = useSharedValue(0);

  // useEffect(() => {
  //   progress.value = withTiming(1, { duration: 1000 });
  // });

  const startProgressAnimation = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, {
      duration: 4000,
    });
  }, []);

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const animatedProps = useAnimatedProps(() => {
    // return { strokeDashoffset: CIRCLE_LENGTH * progress.value };
    return { strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value) };
  });
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>ddddd</Text>s */}
      <ReText style={styles.text} text={progressText} />
      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2 - 20}
          stroke={CircularProgressColors.BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
          r={RADIOUS}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2 - 20}
          stroke={CircularProgressColors.STROKE_COLOR}
          strokeWidth={15}
          r={RADIOUS}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={startProgressAnimation}
      >
        <Text style={styles.btnTxtStyle}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CircularProgess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CircularProgressColors.BACKGROUND_COLOR,
  },
  text: {
    color: "#fff",
    fontSize: 60,
    zIndex: 1000,

    // marginTop: 40,
  },

  btnStyle: {
    position: "absolute",
    bottom: 80,
    backgroundColor: CircularProgressColors.BACKGROUND_STROKE_COLOR,
    width: width * 0.7,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
