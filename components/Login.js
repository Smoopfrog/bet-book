import { StyleSheet, Text, View } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text>LOGIN PAGE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Login;
