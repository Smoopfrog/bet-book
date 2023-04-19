import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Bet from "./Bet";
import EmptyErrorMsg from "./EmptyError";
const BetFeed = ({ bets, showBetModal }) => {
  const betComponents = bets.map((bet) => {
    return <Bet key={bet.id} bet={bet} />;
  });

  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      <ScrollView>
        {bets.length ? (
          betComponents
        ) : (
          <EmptyErrorMsg showBetModal={showBetModal} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
});
export default BetFeed;
