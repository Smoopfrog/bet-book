import { Feather } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import { useEffect } from "react";
import SwipeableCard from "./SwipeableCard";

const Bet = ({ item, setBets, bets }) => {
  const resultHandler = (result) => {
    const [changedBet] = bets.filter((bet) => bet.id === item.id);
    const filteredArr = bets.filter((bet) => bet.id !== item.id);
    changedBet.result = result;
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
    <SwipeableCard resultHandler={resultHandler} cardType={item.result}>
      <View
        style={[
          styles.card,
          item.result === "winner" && styles.winnercard,
          item.result === "pending" && styles.activeCard,
          item.result === "loser" && styles.loserCard,
        ]}
      >
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
    </SwipeableCard>
  );
};

const styles = StyleSheet.create({
  winnercard: {
    backgroundColor: "green",
  },
  loserCard: {
    backgroundColor: "red",
  },
  activeCard: {
    backgroundColor: "#FFAC41",
  },
  card: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
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
