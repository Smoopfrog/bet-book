import { useEffect, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Switch,
} from "react-native";
import ModalCard from "./ModalCard";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const SortModal = ({
  showModal,
  closeModal,
  sortBetsAlphabetically,
  sortBetsChronologically,
  filterAllBets,
  filterActiveBets,
  filterSettledBets,
  activeFilter,
  sortMethod,
}) => {
  const [filterAllButton, setFilterAllButton] = useState();
  const [filterActiveButton, setFilterActiveButton] = useState();
  const [filterSettledButton, setFilterSettledButton] = useState();
  const [sortDateButton, setSortDateButton] = useState();
  const [sortAlphabeticalButton, setSortAlphabeticalButton] = useState();
  // const [isEnabled, setIsEnabled] = useState(false);

  // const toggleSwitch = () => setIsEnabled();
  useEffect(() => {
    if (sortMethod === "date") {
      setSortDateButton(true);
      setSortAlphabeticalButton(false);
    }
    if (sortMethod === "alphabetical") {
      setSortDateButton(false);
      setSortAlphabeticalButton(true);
    }
  }, [sortMethod]);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilterAllButton(true);
      setFilterActiveButton(false);
      setFilterSettledButton(false);
    }
    if (activeFilter === "active") {
      setFilterAllButton(false);
      setFilterActiveButton(true);
      setFilterSettledButton(false);
    }
    if (activeFilter === "settled") {
      setFilterAllButton(false);
      setFilterActiveButton(false);
      setFilterSettledButton(true);
    }
  }, [activeFilter]);

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
    <ModalCard showModal={showModal} closeModal={closeModal}>
      <View style={styles.modalView} onLayout={onLayoutRootView}>
        <View style={styles.buttonContainer}>
          <View style={styles.leftContainer}>
            <View>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    fontFamily: "Orbitron-Regular",
                  },
                ]}
              >
                Sort by:
              </Text>
            </View>
            <View style={styles.switchContainer}>
              <Text
                style={{
                  fontFamily: "Orbitron-Regular",
                }}
              >
                Date
              </Text>
              <Switch
                onValueChange={sortBetsChronologically}
                value={sortDateButton}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text
                style={{
                  fontFamily: "Orbitron-Regular",
                }}
              >
                A-Z
              </Text>
              <Switch
                onValueChange={sortBetsAlphabetically}
                value={sortAlphabeticalButton}
              />
            </View>
          </View>
          <View>
            <Text
              style={[styles.sectionTitle, { fontFamily: "Orbitron-Regular" }]}
            >
              Filter by:
            </Text>
            <View style={styles.switchContainer}>
              <Switch onValueChange={filterAllBets} value={filterAllButton} />
              <Text
                style={{
                  fontFamily: "Orbitron-Regular",
                }}
              >
                All
              </Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={filterActiveBets}
                value={filterActiveButton}
              />
              <Text
                style={{
                  fontFamily: "Orbitron-Regular",
                }}
              >
                Active
              </Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={filterSettledBets}
                value={filterSettledButton}
              />
              <Text
                style={{
                  fontFamily: "Orbitron-Regular",
                }}
              >
                Settled
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
          <Text style={styles.innerBtn}>Close</Text>
        </TouchableOpacity>
      </View>
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderColor: "#9C2C77",
    borderWidth: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#9C2C77",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  leftContainer: {
    borderRightWidth: 2,
    borderRightColor: "black",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    width: 100,
  },
  sectionTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  closeBtn: {
    marginTop: 5,
    width: 100,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "green",
  },
  innerBtn: {
    color: "white",
  },
});

export default SortModal;
