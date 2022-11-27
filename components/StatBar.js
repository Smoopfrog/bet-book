import { StyleSheet, Text, View } from "react-native";

const StatBar = ({bets}) => {
  const totalBets = bets.length
  const betsWon = bets.filter(bet => bet.winner).length
  const betsLost = bets.filter(bet => !bet.winner).length


  return (
    <View>
      <Text>Total Bets: {totalBets}</Text>
      <Text>Winning Percentage: {(betsWon / totalBets) * 100}%</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '20%'
  }
})
export default StatBar;
