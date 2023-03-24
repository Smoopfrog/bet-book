import { StyleSheet, View } from "react-native";
import Home from "./components/Home/Home";
import LoginScreen from "./components/LoginScreen";

export default App = () => {
  return (
    <View style={styles.app}>
      <LoginScreen />
      {/* <Home /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: "white",
    flex: 1,
  },
});
