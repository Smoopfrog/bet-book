import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Bet from "./Bet";
import EmptyErrorMsg from "./EmptyError";
const BetFeed = ({ bets }) => {
  const betComponents = bets.map((bet) => {
    return <Bet key={bet.id} bet={bet} />;
  });

  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      <ScrollView>{bets.length ? betComponents : <EmptyErrorMsg />}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
});
export default BetFeed;
