import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const StatBar = ({ bets }) => {
  const totalBets = bets.length;
  const betsWon = bets.filter((bet) => bet.result === "winner").length;
  const betsLost = bets.filter((bet) => bet.result === "loser").length;
  const betsPending = bets.filter((bet) => bet.result === "pending").length;
  const betsUnsettled = bets.filter((bet) => bet.active).length;
  const winningPercentage = betsWon / (totalBets - betsPending);

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text>Total Bets: {totalBets}</Text>
        <Text>Won: {betsWon}</Text>
        <Text>Lost: {betsLost}</Text>
        <Text>Unsettled: {betsUnsettled}</Text>
      </View>
      <View style={styles.porgressCircleContainter}>
        <Progress.Circle
          color={"green"}
          unfilledColor={"red"}
          progress={winningPercentage >= 0 ? winningPercentage : 0}
          size={100}
          showsText={true}
        />
      </View>
      <View style={styles.statsContainer}>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  statsContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
  porgressCircleContainter: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
export default StatBar;
