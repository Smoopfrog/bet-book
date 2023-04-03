import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import Bet from "./Bet";

const BetFeed = ({ bets, setBets }) => {
  const betComponents = bets.map((bet) => {
    return <Bet key={bet.id} bet={bet} />;
  });

  return (
    <SafeAreaView>
      <ScrollView>{betComponents}</ScrollView>
    </SafeAreaView>
  );
};

export default BetFeed;
