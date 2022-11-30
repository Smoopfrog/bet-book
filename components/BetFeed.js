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
    <FlatList
      data={bets}
      renderItem={({ item, index }) => (
        <Bet item={item} bets={bets} setBets={setBets} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default BetFeed;
