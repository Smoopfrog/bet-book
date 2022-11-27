import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';

const StatBar = ({bets}) => {
  const totalBets = bets.length
  const betsWon = bets.filter(bet => bet.winner).length
  const betsLost = bets.filter(bet => !bet.winner).length
  const betsSettled = bets.filter(bet => !bet.settled).length

  const winningPercentage = (betsWon / totalBets)


  return (
    <View>
      <Text>Total Bets: {totalBets}</Text>
      <Text>Winning Percentage</Text>

      <Progress.Bar color={'green'} unfilledColor={'red'} progress={winningPercentage} width={200} />

      <Text>{betsSettled} Unsettled bets</Text>
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
