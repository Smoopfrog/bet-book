import { Feather } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SwipeableCard from "./SwipeableCard";
import moment from "moment";
import EditBetModal from "./EditBetModal";
import { useState } from "react";
const Bet = ({ item, setBets, bets, showEditModal }) => {
  const [showEditBetModal, setShowEditBetModal] = useState(false);

  const editBetModalHandler = () => {
    setShowEditBetModal(!showEditBetModal);
  };
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

  const date = moment(item.date).format("MMM Do, YYYY");

  return (
    <SwipeableCard resultHandler={resultHandler} cardType={item.result}>
      <TouchableHighlight delayLongPress="1000" onLongPress={editBetModalHandler}>
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
              <Text style={styles.text}>#{item.id}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.text}>{date}</Text>
              <Text style={styles.text}>{item.person}</Text>
              <Text style={styles.text}>{item.wager}</Text>
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
          <EditBetModal
            closeModal={editBetModalHandler}
            showModal={showEditBetModal}
            bet={item}
          />
        </View>
      </TouchableHighlight>
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
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    justifyContent: "center",
  },
  winnerButton: {
    color: "green",
  },
  text: {
    color: "white",
  },
});

export default Bet;
