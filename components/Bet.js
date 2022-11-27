import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";

const Bet = (props) => {
  const [winnerChecked, setWinnerChecked] = useState(false);
  const [loserChecked, setLoserChecked] = useState(false);
  const [settledChecked, setSettledChecked] = useState(false);

  const winnerHandler = () => {
    console.log('winner')
    setWinnerChecked(true);
    setLoserChecked(false);
  };

  const loserHandler = () => {
    console.log('loser')

    setWinnerChecked(true);
    setLoserChecked(true);
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
            isChecked={winnerChecked}
            onPress={winnerHandler}
          />
          <BouncyCheckbox
            iconComponent={<Feather name="x" size={15} color="white" />}
            isChecked={loserChecked}
            onPress={loserHandler}
          />
          <BouncyCheckbox
            fillColor={"black"}
            iconComponent={<Feather name="lock" size={15} color="white" />}
            onPress={setSettledChecked}
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
