import { StyleSheet, Text, View, Animated } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const SwipeableCard = (props) => {
  const [fontsLoaded] = useFonts({
    "Orbitron-Regular": require("../../assets/fonts/Orbitron-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const RenderRight = (progress, dragX) => {
    // const scale = dragX.interpolate({
    //   inputRange: [-50, 0.5],
    //   outputRange: [1, 0.1],
    // });

    // const Style = {
    //   transform: [{ scale }],
    // };

    let result = "Winner";
    if (props.cardType === "loser") {
      result = "Reset?";

      return (
        <View
          style={{
            width: "100%",
            backgroundColor: "black",
            borderColor: "white",
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              fontWeight: "600",
              fontFamily: "Orbitron-Regular",
            }}
          >
            {result}
          </Animated.Text>
        </View>
      );
    }
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "black",
          borderColor: "green",
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{
            color: "green",
            fontWeight: "600",
            fontFamily: "Orbitron-Regular",
          }}
        >
          {result}
        </Animated.Text>
      </View>
    );
  };

  const RenderLeft = (progress, dragX) => {
    // const scale = dragX.interpolate({
    //   inputRange: [0.5, 50],
    //   outputRange: [0.1, 1],
    // });

    // const Style = {
    //   transform: [{ scale }],
    // };

    let result = "Loser";
    if (props.cardType === "winner") {
      result = "Reset?";
      return (
        <View
          style={{
            width: "100%",
            backgroundColor: "black",
            borderColor: "white",
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              fontWeight: "600",
              fontFamily: "Orbitron-Regular",
            }}
          >
            {result}
          </Animated.Text>
        </View>
      );
    }

    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "black",
          borderColor: "red",
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{
            color: "red",
            fontWeight: "600",
            fontFamily: "Orbitron-Regular",
          }}
        >
          {result}
        </Animated.Text>
      </View>
    );
  };

  return (
    <>
      {props.cardType === "pending" && (
        <Swipeable
          useNativeAnimations
          renderRightActions={RenderRight}
          onSwipeableRightOpen={() => props.resultHandler("winner")}
          renderLeftActions={RenderLeft}
          onSwipeableLeftOpen={() => props.resultHandler("loser")}
        >
          {props.children}
        </Swipeable>
      )}
      {props.cardType === "winner" && (
        <Swipeable
          useNativeAnimations
          renderLeftActions={RenderLeft}
          onSwipeableLeftOpen={() => props.resultHandler("pending")}
        >
          {props.children}
        </Swipeable>
      )}
      {props.cardType === "loser" && (
        <Swipeable
          useNativeAnimations
          renderRightActions={RenderRight}
          onSwipeableRightOpen={() => props.resultHandler("pending")}
        >
          {props.children}
        </Swipeable>
      )}
    </>
  );
};

export default SwipeableCard;
