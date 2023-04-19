import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

import { useCallback } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const EmptyErrorMsg = () => {
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
    <View style={[styles.card, styles.activeCard]} onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={[styles.titleFont, { fontFamily: "Orbitron-Regular" }]}>
            You have no current bets. Please add some by using the button below.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: "black",
    borderColor: "#FFF",
    borderWidth: 2,
  },

  title: {
    alignItems: "center",
  },
  titleFont: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmptyErrorMsg;
