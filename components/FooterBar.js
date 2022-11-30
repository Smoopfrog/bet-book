import { StyleSheet, Text, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const FooterBar = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <SimpleLineIcons
          name="plus"
          size={30}
          color="white"
          onPress={props.openModal}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default FooterBar;
