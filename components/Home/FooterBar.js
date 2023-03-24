import { StyleSheet, View } from "react-native";
import {
  SimpleLineIcons,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FooterBar = (props) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.replace("LoginScreen");
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
          onPress={handleLogout}
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
