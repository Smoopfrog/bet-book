import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const StatBar = ({ bets }) => {
  const [fontsLoaded] = useFonts({
    "Orbitron-Regular": require("../../assets/fonts/Orbitron-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const totalBets = bets.length;
  const betsWon = bets.filter((bet) => bet.result === "winner").length;
  const betsLost = bets.filter((bet) => bet.result === "loser").length;
  const betsPending = bets.filter((bet) => bet.result === "pending").length;
  // const betsUnsettled = bets.filter((bet) => bet.active).length;
  const winningPercentage = betsWon / (totalBets - betsPending);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.statsContainer}>
        <Text style={{ fontFamily: "Orbitron-Regular", color: "white" }}>
          Total Bets: {totalBets}
        </Text>
        <Text style={{ fontFamily: "Orbitron-Regular", color: "white" }}>Won: {betsWon}</Text>
        <Text style={{ fontFamily: "Orbitron-Regular", color: "white" }}>Lost: {betsLost}</Text>
        <Text style={{ fontFamily: "Orbitron-Regular", color: "white" }}>Pending: {betsPending}</Text>
      </View>
      <View style={styles.porgressCircleContainter}>
        <Progress.Circle
          color={"green"}
          unfilledColor={"red"}
          progress={winningPercentage >= 0 ? winningPercentage : 0}
          size={100}
          showsText={true}
        />
      </View>
      <View style={styles.statsContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  statsContainer: {
    flex: 1,
  },
  porgressCircleContainter: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
export default StatBar;
