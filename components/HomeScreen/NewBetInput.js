import { StyleSheet, Text, TextInput, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const NewBetInput = ({ label, value, changeHandler }) => {
  const [fontsLoaded] = useFonts({
    "Orbitron-Regular": require("../../assets/fonts/Orbitron-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.rowContainer} onLayout={onLayoutRootView}>
      <Text style={[styles.text, { fontFamily: "Orbitron-Regular" }]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Orbitron-Regular" }]}
        value={value}
        onChangeText={changeHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    fontWeight: "600",
  },
  input: {
    height: 40,
    margin: 10,
    width: "70%",
    borderWidth: 1,
    padding: 10,
  },
});
export default NewBetInput;
