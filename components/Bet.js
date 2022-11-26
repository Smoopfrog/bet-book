import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const Bet = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.text}>{props.date}</Text>
          <Text style={styles.text}>{props.person}</Text>
          <Text style={styles.text}>{props.wager}</Text>
        </View>
        <View style={styles.title}>
          <Text >{props.title}</Text>
        </View>
        <View style={styles.icon}>
          <Feather name="chevrons-down" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    width: "90%",
    borderColor: "#CD104D",
    borderWidth: 2,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    justifyContent: "center",
  },
  icon: {
    justifyContent: "center",
  },
});

export default Bet;
