import { StyleSheet, View } from "react-native";
import Home from "./components/Home/Home";

export default App = () => {
  return (
    <View style={styles.app}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: "white",
    flex: 1,
  },
});
