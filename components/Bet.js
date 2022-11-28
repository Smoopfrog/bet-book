import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Bet = (props) => {
  const winnerHandler = () => {
    const [changedBet] = props.bets.filter((bet) => bet.id === props.id);
    const filteredArr = props.bets.filter((bet) => bet.id !== props.id);
    changedBet.winner = !changedBet.winner;
    const newArray = [...filteredArr, changedBet].sort((a, b) => b.id - a.id);
    props.setBets(newArray);
  };

  const settledHandler = () => {
    const [changedBet] = props.bets.filter((bet) => bet.id === props.id);
    const filteredArr = props.bets.filter((bet) => bet.id !== props.id);
    changedBet.settled = !changedBet.settled;
    const newArray = [...filteredArr, changedBet].sort((a, b) => b.id - a.id);
    props.setBets(newArray);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.titleFont}>{props.title}</Text>
          <Text>#{props.id}</Text>
        </View>
        <View style={styles.body}>
          <Text>{props.date}</Text>
          <Text>{props.person}</Text>
          <Text>{props.wager}</Text>
        </View>
        <View style={styles.icon}>
          <BouncyCheckbox
            fillColor={styles.winnerButton.color}
            isChecked={props.winner}
            onPress={winnerHandler}
          />
          <BouncyCheckbox
            iconComponent={<Feather name="x" size={15} color="white" />}
            isChecked={!props.winner}
            onPress={winnerHandler}
          />
          <BouncyCheckbox
            fillColor={"black"}
            iconComponent={<Feather name="lock" size={15} color="white" />}
            isChecked={props.settled}
            onPress={settledHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1,
    padding: 10
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    alignItems: 'center'
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
