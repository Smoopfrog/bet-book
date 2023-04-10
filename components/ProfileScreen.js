import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
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
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>ACCOUNT</Text>

      <View style={[styles.sectionContainer, styles.accountSection]}>
        <Text style={styles.textTitle}>Email</Text>
        <Text>{auth.currentUser.email}</Text>
      </View>
      <View style={[styles.sectionContainer, styles.accountSection]}>
        <Text style={styles.textTitle}>Logout</Text>
        <TouchableHighlight style={styles.logoutButton} onPress={logoutHandler}>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.sectionTitle}>
        <Ionicons name="stats-chart" size={24} color="black" />
        <Text style={styles.sectionTitleText}>STATS</Text>
      </View>
      <View style={[styles.sectionContainer, styles.statsSection]}>
        <Text>Total Bets: {totalBets}</Text>
        <Text>Total Wins: {betsWon}</Text>
        <Text>Total Loses: {betsLost}</Text>
        <Text>Total Pending: {betsPending}</Text>
        <Text>Total Settled: {betsSettled}</Text>
        <Text>Win Percentage: {winningPercentage}%</Text>
        <Text>Total Money Won: ${moneyWon}</Text>
        <Text>Total Money Lost: ${moneyLost}</Text>
        <Text>Total Winnings: {othersWon ? othersWon : "Nothing"}</Text>
        <Text>Total Lost: {othersLost ? othersLost : "Nothing"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f8f0fc",
  },
  sectionTitle: {
    width: "90%",
    marginTop: 10,
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "600",
  },
  sectionTitleText: {
    alignSelf: "flex-end",
    fontWeight: "600",
  },
  sectionContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 3,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#e599f7",
    alignItems: "center",
  },
  textTitle: {
    fontWeight: "600",
  },
  accountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutButton: {
    width: 50,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "red",
  },
  statsSection: {
    alignItems: "start",
  },
  buttonText: {
    color: "white",
  },
});

export default ProfileScreen;
