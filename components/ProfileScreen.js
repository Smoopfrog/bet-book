import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { MaterialIcons } from "@expo/vector-icons";
const ProfileScreen = ({ bets }) => {
  const calculateDollarWinnings = (bets, result) => {
    let winnings = 0;
    for (const bet of bets) {
      if (bet.wager[0] === "$" && bet.result === result) {
        winnings += Number(bet.wager.slice(1));
      }
    }
    return winnings;
  };

  const calculateOtherWinnings = (bets, result) => {
    let winnings = [];
    for (const bet of bets) {
      if (bet.wager[0] !== "$" && bet.result === result) {
        winnings.push(bet.wager);
      }
    }
    return winnings.join(", ");
  };

  const totalBets = bets.length;
  const betsWon = bets.filter((bet) => bet.result === "winner").length;
  const betsLost = bets.filter((bet) => bet.result === "loser").length;
  const winningPercentage = Math.round(
    (betsWon / (totalBets - betsPending)) * 100
  );
  const betsPending = bets.filter((bet) => bet.result === "pending").length;
  const betsSettled = bets.filter((bet) => !bet.active).length;
  const moneyWon = calculateDollarWinnings(bets, "winner");
  const moneyLost = calculateDollarWinnings(bets, "loser");
  const othersWon = calculateOtherWinnings(bets, "winner");
  const othersLost = calculateOtherWinnings(bets, "loser");

  const navigation = useNavigation();

  const logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.mess));
  };

  return (
    <View>
      <Text>Sign in as: {auth.currentUser.email}</Text>
      <TouchableHighlight style={styles.logoutButton} onPress={logoutHandler}>
        <View>
          <MaterialIcons name="logout" size={30} color="white" />
          <Text style={styles.buttonText}>Logout</Text>
        </View>
      </TouchableHighlight>
      <View>
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
          <Text>Total Money Won: ${moneyWon}</Text>
        </View>
        <View>
          <Text>Total Money Lost: ${moneyLost}</Text>
        </View>
        <View>
          <Text>Total Winnings: {othersWon ? othersWon : "Nothing"}</Text>
        </View>
        <View>
          <Text>Total Lost: {othersLost ? othersLost : "Nothing"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    width: 200,
    backgroundColor: "red",
    padding: 6,
  },
  backButton: {
    backgroundColor: "black",
    padding: 6,
  },
  buttonText: {
    color: "white",
  },
});

export default ProfileScreen;
