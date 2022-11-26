import { Button, View, StyleSheet, Alert, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const NavBar = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SimpleLineIcons
          name="menu"
          size={24}
          color="white"
          onPress={props.openModal}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>BETBOOK</Text>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FD841F",
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
