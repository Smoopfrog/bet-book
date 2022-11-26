import { ScrollView, StyleSheet, View } from "react-native";
import Bet from "./Bet";

const BetFeed = () => {
  return (
    <ScrollView contentContainerStyle={styles.innerContainer}>
        <Bet></Bet>
        <Bet></Bet>
        <Bet></Bet>
        <Bet></Bet>
        <Bet></Bet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // outerContainer: {
  //   height: '100%'
  // },
  innerContainer: {
    alignItems: 'center'
  }
})


export default BetFeed;
