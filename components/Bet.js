import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Bet = (props) => {
  const winnerHandler = () => {
    const [changedBet] = props.bets.filter(bet => bet.id === props.id)
    const filteredArr = props.bets.filter(bet => bet.id !== props.id)
    changedBet.winner = !changedBet.winner;
    const newArray = [...filteredArr, changedBet ].sort((a, b) => b.id - a.id )
    props.setBets(newArray)
  };

  const settledHandler = () => {
    const [changedBet] = props.bets.filter(bet => bet.id === props.id)
    const filteredArr = props.bets.filter(bet => bet.id !== props.id)
    changedBet.settled = !changedBet.settled;
    const newArray = [...filteredArr, changedBet ].sort((a, b) => b.id - a.id )
    props.setBets(newArray)
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.date}</Text>
          <Text style={styles.text}>{props.person}</Text>
          <Text style={styles.text}>{props.wager}</Text>
          <Text style={styles.text}>#{props.id}</Text>

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
            // onPress={setSettledChecked}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    width: "90%",
    borderColor: "#CD104D",
    borderWidth: 2,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
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
