import { ScrollView, StyleSheet, View } from "react-native";
import Bet from "./Bet";

const BetFeed = ({ bets, setBets }) => {
  const betsArray = bets.map((bet) => {
    return <Bet key={Math.random()}/>;
  });
  return (
    <ScrollView contentContainerStyle={styles.innerContainer}>
      {betsArray}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // outerContainer: {
  //   height: '100%'
  // },
  innerContainer: {
    alignItems: "center",
  },
});

export default BetFeed;
