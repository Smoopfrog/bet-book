import { ScrollView, StyleSheet, View, FlatList } from "react-native";
import Bet from "./Bet";

const BetFeed = ({ bets, setBets }) => {
  const activeBets = bets.filter((bet) => bet.active);
  const settledBets = bets.filter((bet) => !bet.active);

  const activeBetsArray = activeBets.map((bet) => {
    return (
      <Bet
        key={bet.id}
        title={bet.title}
        date={bet.date}
        wager={bet.wager}
        person={bet.person}
        result={bet.result}
        active={bet.active}
        id={bet.id}
        setBets={setBets}
        bets={bets}
      />
    );
  });

  const settledBetsArray = settledBets.map((bet) => {
    return (
      <Bet
        key={bet.id}
        title={bet.title}
        date={bet.date}
        wager={bet.wager}
        person={bet.person}
        result={bet.result}
        active={bet.active}
        id={bet.id}
        setBets={setBets}
        bets={bets}
      />
    );
  });

  return (
    // // <ScrollView horizontal>
    // <ScrollView contentContainerStyle={styles.innerContainer}>
    //   {activeBetsArray}
    // </ScrollView>
    <FlatList
      data={bets}
      renderItem={({ item, index }) => (
        <Bet item={item} bets={bets} setBets={setBets} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
{
  /* <AppleStyleSwipeableRow>
<Row item={item} />
</AppleStyleSwipeableRow> */
}
const styles = StyleSheet.create({
  innerContainer: {
    alignItems: "center",
    width: "100%",
  },
});

export default BetFeed;
