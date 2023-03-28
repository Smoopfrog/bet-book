import { StyleSheet, View } from "react-native";
import {
  SimpleLineIcons,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { auth } from "../../firebase";

const FooterBar = (props) => {
  const navigation = useNavigation();

  const profileScreenHandler = () => {
    navigation.navigate("ProfileScreen");
  };

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
          onPress={props.showStatsModal}
        />
      </View>
      <View>
        <MaterialIcons
          name="logout"
          size={30}
          color="white"
          onPress={profileScreenHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: "100%",
    padding: 12,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default FooterBar;
