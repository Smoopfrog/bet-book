import { Button, View, StyleSheet, Alert, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const NavBar = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BETBOOK</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 5,
    paddingTop: 20,
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NavBar;
