import { StyleSheet, Text, View, Animated } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

const RenderRight = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-50, 0.5],
    outputRange: [1, 0.1],
  });

  const Style = {
    transform: [{ scale }],
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.Text style={[Style, { color: "#fff", fontWeight: "600" }]}>
        Winner
      </Animated.Text>
    </View>
  );
};

const RenderLeft = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0.5, 50],
    outputRange: [0.1, 1],
  });

  const Style = {
    transform: [{ scale }],
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.Text style={[Style, { color: "#fff", fontWeight: "600" }]}>
        Loser
      </Animated.Text>
    </View>
  );
};
const SwipeableCard = (props, { cardType, resultHandler}) => {
  console.log(cardType)
  
  return (
    <>
      {cardType && (
        <Swipeable
          useNativeAnimations
          renderRightActions={RenderRight}
          overshootRight={false}
          onSwipeableRightOpen={() => resultHandler("winner")}
          renderLeftActions={RenderLeft}
          // overshootLeft={false}
          onSwipeableLeftOpen={() => resultHandler("loser")}
        >
          {props.children}
        </Swipeable>
      )}
    </>
  );
};

export default SwipeableCard;
