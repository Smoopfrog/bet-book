import { StyleSheet, Text, View, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Swipeable, RectButton } from "react-native-gesture-handler";

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
        width: '100%',
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
        width: '100%',
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

const Bet = ({ item, setBets, bets }) => {
  const setLoser = () => {
    alert("Loser!");
  };
  const winnerHandler = () => {
    const [changedBet] = bets.filter((bet) => bet.id === item.id);
    const filteredArr = bets.filter((bet) => bet.id !== item.id);
    changedBet.winner = true;
    const newArray = [...filteredArr, changedBet].sort((a, b) => b.id - a.id);
    setBets(newArray);
  };

  const loserHandler = () => {
    const [changedBet] = bets.filter((bet) => bet.id === item.id);
    const filteredArr = bets.filter((bet) => bet.id !== item.id);
    changedBet.winner = false;
    const newArray = [...filteredArr, changedBet].sort((a, b) => b.id - a.id);
    setBets(newArray);
  };

  const settledHandler = () => {
    const [changedBet] = bets.filter((bet) => bet.id === item.id);
    const filteredArr = bets.filter((bet) => bet.id !== item.id);
    changedBet.active = !changedBet.active;
    const newArray = [...filteredArr, changedBet].sort((a, b) => b.id - a.id);
    setBets(newArray);
  };

  return (
    <Swipeable
      useNativeAnimations
      renderRightActions={RenderRight}
      overshootRight={false}
      onSwipeableRightOpen={winnerHandler}
      renderLeftActions={RenderLeft}
      // overshootLeft={false}
      onSwipeableLeftOpen={loserHandler}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.titleFont}>{item.title}</Text>
            <Text>#{item.id}</Text>
          </View>
          <View style={styles.body}>
            <Text>{item.date}</Text>
            <Text>{item.person}</Text>
            <Text>{item.wager}</Text>
          </View>
          <View style={styles.icon}>
            <BouncyCheckbox
              fillColor={"black"}
              iconComponent={<Feather name="lock" size={15} color="white" />}
              isChecked={!item.active}
              onPress={settledHandler}
            />
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFAC41",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    alignItems: "center",
  },
  titleFont: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    justifyContent: "center",
  },
  winnerButton: {
    color: "green",
  },
});

export default Bet;
