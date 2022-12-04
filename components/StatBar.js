import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const StatBar = ({ bets }) => {
  const totalBets = bets.length;
  const betsWon = bets.filter((bet) => bet.result === "winner").length;
  const betsLost = bets.filter((bet) => bet.result === "loser").length;
  const betsPending = bets.filter((bet) => bet.result === "pending").length;
  const betsSettled = bets.filter((bet) => !bet.active).length;
  const winningPercentage = betsWon / (totalBets - betsPending);

  return (
    <View style={styles.container}>
      <Text>Total Bets: {totalBets}</Text>
      <Text>Unsettled bets: {betsSettled}</Text>
      <Text>Winning Percentage</Text>
      <View style={styles.porgressCircleContainter}>
        <Progress.Circle
          color={"green"}
          unfilledColor={"red"}
          progress={winningPercentage >= 0 ? winningPercentage : 0}
          size={100}
          showsText={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
  },
  porgressCircleContainter: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StatBar;
