import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const StatBar = ({ bets }) => {
  const totalBets = bets.length;
  const betsWon = bets.filter((bet) => bet.winner).length;
  const betsLost = bets.filter((bet) => !bet.winner).length;
  const betsSettled = bets.filter((bet) => !bet.settled).length;

  const winningPercentage = betsWon / totalBets;

  return (
    <View style={styles.container}>
      <Text>Total Bets: {totalBets}</Text>
      <Text>Unsettled bets: {betsSettled}</Text>
      <Text>Winning Percentage</Text>
      <Progress.Bar
        color={"green"}
        unfilledColor={"red"}
        progress={winningPercentage}
        width={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
  },
});
export default StatBar;
