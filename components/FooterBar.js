import { StyleSheet, View } from "react-native";
import { SimpleLineIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

const FooterBar = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <FontAwesome
          name="unsorted"
          size={30}
          color="white"
          onPress={props.showSortModal}
        />
      </View>
      <View>
        <SimpleLineIcons
          name="plus"
          size={30}
          color="white"
          onPress={props.showBetModal}
        />
      </View>
      <View>
        <Ionicons
          name="stats-chart-sharp"
          size={30}
          color="white"
          onPress={props.showSortModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: "#000",
    width: "100%",
    position: "fixed",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default FooterBar;
