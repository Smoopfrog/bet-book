import { StyleSheet, Text, View, Animated } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

const SwipeableCard = (props) => {
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
            backgroundColor: "#FFAC41",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Text style={{ color: "#fff", fontWeight: "600" }}>
            {result}
          </Animated.Text>
        </View>
      );
    }
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "green",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text style={{ color: "#fff", fontWeight: "600" }}>
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
            backgroundColor: "#FFAC41",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Text style={{ color: "#fff", fontWeight: "600" }}>
            {result}
          </Animated.Text>
        </View>
      );
    }

    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text style={{ color: "#fff", fontWeight: "600" }}>
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
