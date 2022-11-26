import { StyleSheet, Text, View } from "react-native";

const Bet = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text>Date</Text>
        <Text>Title</Text>
        <Text>Person</Text>
        <Text>Wager</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    width: '90%',
    backgroundColor: '#CD104D'
  },
  header: {
    flexDirection: "row",
  },
});
export default Bet;
