import { ScrollView, StyleSheet, View, FlatList } from "react-native";
import Bet from "./Bet";

const BetFeed = ({ bets, setBets }) => {
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
