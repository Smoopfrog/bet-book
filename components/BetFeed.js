import { ScrollView, View } from "react-native";
import Bet from "./Bet";

const BetFeed = () => {
  return (
    <ScrollView>
      <View>
        <Bet></Bet>
        <Bet></Bet>
        <Bet></Bet>
        <Bet></Bet>
        <Bet></Bet>
      </View>
    </ScrollView>
  );
};


export default BetFeed;
