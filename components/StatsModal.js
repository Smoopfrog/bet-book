import { View, StyleSheet, Text } from "react-native";
import ModalCard from "./ModalCard";

const StatsModal = ({ showModal, closeModal, bets }) => {
  const totalBets = bets.length;
  const betsWon = bets.filter((bet) => bet.result === "winner").length;
  const betsLost = bets.filter((bet) => bet.result === "loser").length;
  const betsPending = bets.filter((bet) => bet.result === "pending").length;
  const betsSettled = bets.filter((bet) => !bet.active).length;
  const winningPercentage = (betsWon / (totalBets - betsPending)) * 100;

  const calculateWinnings = (bets, result) => {
    let winnings = 0;
    for (const bet of bets) {
      if(bet.wager[0] === "$" && bet.result === result) {
        winnings += Number(bet.wager.slice(1))
      }
    }
    return winnings
  };

  return (
    <ModalCard showModal={showModal} closeModal={closeModal}>
      <View style={styles.modalView}>
        <View>
          <Text>Total Bets: {totalBets}</Text>
        </View>
        <View>
          <Text>Total Wins: {betsWon}</Text>
        </View>
        <View>
          <Text>Total Loses: {betsLost}</Text>
        </View>
        <View>
          <Text>Total Pending: {betsPending}</Text>
        </View>
        <View>
          <Text>Total Settled: {betsSettled}</Text>
        </View>
        <View>
          <Text>Win Percentage: {winningPercentage}%</Text>
        </View>
        <View>
          <Text>Win Percentage: {winningPercentage}%</Text>
        </View>
        <View>
          <Text>Total Winnings: ${calculateWinnings(bets, 'winner')}</Text>
        </View>
        <View>
          <Text>Total Winnings: ${calculateWinnings(bets, 'loser')}</Text>
        </View>
      </View>
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderColor: "#9C2C77",
    borderWidth: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#9C2C77",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default StatsModal;
