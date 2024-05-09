import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { IMAGES } from "../../assets/Images";
import {
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: SIZE } = Dimensions.get("screen");
const AnimatedImage = Animated.createAnimatedComponent(Image);
const DoubleTabLikeInstagramAnimation = () => {
  const doubleTabRef = useRef();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scaleFillLike = useSharedValue(0);
  const [showFillheart, setShowFillHeart] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const onDubleTap = useCallback(() => {
    console.log("called double tap");

    setShowFillHeart(true);
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(600, withSpring(0));
      }
    });

    scaleFillLike.value = withTiming(1);
  }, [scale.value]);

  const handlSingleTap = useCallback(() => {
    // if (opacity.value === 0) {
    //   opacity.value = withTiming(1);
    // } else {
    //   opacity.value = withTiming(0);
    // }
    console.log("called single tap");

    opacity.value = withTiming(0, { duration: 600 }, (isFinished) => {
      if (isFinished) {
        opacity.value = withTiming(1, { duration: 600 });
      }
    });
  }, []);

  const animatedTxtStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animatedBottomLikeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleFillLike.value }],
    };
  });

  const handBottomLike = () => {
    "worklet";
    if (scaleFillLike.value === 0) {
      scaleFillLike.value = withTiming(1);
      setShowFillHeart(true);
    } else {
      scaleFillLike.value = withTiming(0);
      setShowFillHeart(false);
    }
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTabRef} onActivated={handlSingleTap}>
        <TapGestureHandler
          numberOfTaps={2}
          onActivated={onDubleTap}
          ref={doubleTabRef}
        >
          <Animated.View>
            <Image style={styles.imgStyle} source={IMAGES.INSTAGRAM} />
            <AnimatedImage
              source={IMAGES.LIKE}
              style={[styles.like, animatedStyle]}
              resizeMode={"center"}
            />
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>

      <TouchableOpacity onPress={handBottomLike}>
        {showFillheart ? (
          <AnimatedImage
            source={IMAGES.LIKE}
            style={[styles.bottomLike, animatedBottomLikeStyle]}
          />
        ) : (
          <AnimatedImage
            source={IMAGES.EMPTY_HEART}
            style={[styles.bottomLike]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DoubleTabLikeInstagramAnimation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imgStyle: {
    width: SIZE,
    height: SIZE,
  },
  like: {
    width: 100,
    height: 100,
    position: "absolute",
    top: "40%",
    left: "40%",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 22,
    marginTop: 20,
  },
  bottomLike: {
    marginTop: 20,
    width: 30,
    height: 30,
    marginHorizontal: 20,
  },
});
