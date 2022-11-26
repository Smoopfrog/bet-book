import { ScrollView, StyleSheet, View } from "react-native";
import Bet from "./Bet";

const BetFeed = ({ bets, setBets }) => {
  const betsArray = bets.map((bet) => {
    return (
      <Bet
        key={Math.random()}
        title={bet.title}
        date={bet.date}
        wager={bet.wager}
        person={bet.person}
      />
    );
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
