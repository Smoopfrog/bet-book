import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SwipeableCard from "./SwipeableCard";
import moment from "moment";
import EditBetModal from "./EditBetModal";
import { useState, useCallback } from "react";
import { auth, db } from "../../firebase";
import { ref, set } from "firebase/database";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { updateBetResult } from "../../betsSlice";
import * as Haptics from "expo-haptics";

const Bet = ({ bet }) => {
  const [showEditBetModal, setShowEditBetModal] = useState(false);
  const [active, setActive] = useState(bet.active);
  const userId = auth.currentUser.uid;
  const dispatch = useDispatch();

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

  const editBetModalHandler = () => {
    if (!showEditBetModal) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    setShowEditBetModal(!showEditBetModal);
  };

  const resultHandler = (result) => {
    set(ref(db, "bets/" + userId + "/" + bet.id + "/result"), result)
      .then(() => {
        console.log("Result updated to: ", result);
        if (result === "winner") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        if (result === "pending") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        if (result === "loser") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }

        dispatch(
          updateBetResult({
            id: bet.id,
            value: result,
          })
        );
      })
      .catch((error) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

        alert(error);
      });
  };

  const settledHandler = () => {
    const newActiveStatus = !active;

    set(ref(db, "bets/" + userId + "/" + bet.id + "/active"), newActiveStatus)
      .then(() => {
        console.log("Active status updated to: ", newActiveStatus);
        setActive(newActiveStatus);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const date = moment(bet.date).format("MMM Do, YYYY");

  return (
    <SwipeableCard resultHandler={resultHandler} cardType={bet.result}>
      <TouchableHighlight
        delayLongPress="1000"
        onLongPress={editBetModalHandler}
      >
        <View
          style={[
            styles.card,
            bet.result === "winner" && styles.winnercard,
            bet.result === "pending" && styles.activeCard,
            bet.result === "loser" && styles.loserCard,
          ]}
          onLayout={onLayoutRootView}
        >
          <View style={styles.header}>
            <View style={styles.title}>
              <Text
                style={[
                  styles.titleFont,
                  { fontFamily: "Orbitron-Regular" },
                  bet.result === "winner" && { color: "green" },
                  bet.result === "pending" && { color: "white" },
                  bet.result === "loser" && { color: "red" },
                ]}
              >
                {bet.title}
              </Text>
            </View>
            <View style={styles.body}>
              <Text
                style={[
                  styles.text,
                  { fontFamily: "Orbitron-Regular" },
                  bet.result === "winner" && { color: "green" },
                  bet.result === "pending" && { color: "white" },
                  bet.result === "loser" && { color: "red" },
                ]}
              >
                {date}
              </Text>
              <Text
                style={[
                  styles.text,
                  { fontFamily: "Orbitron-Regular" },
                  bet.result === "winner" && { color: "green" },
                  bet.result === "pending" && { color: "white" },
                  bet.result === "loser" && { color: "red" },
                ]}
              >
                {bet.person}
              </Text>
              <Text
                style={[
                  styles.text,
                  { fontFamily: "Orbitron-Regular" },
                  bet.result === "winner" && { color: "green" },
                  bet.result === "pending" && { color: "white" },
                  bet.result === "loser" && { color: "red" },
                ]}
              >
                {bet.wager}
              </Text>
            </View>
          </View>
          <EditBetModal
            closeModal={editBetModalHandler}
            showModal={showEditBetModal}
            bet={bet}
          />
        </View>
      </TouchableHighlight>
    </SwipeableCard>
  );
};

const styles = StyleSheet.create({
  winnercard: {
    backgroundColor: "black",
    borderColor: "green",
    borderWidth: 2,
    color: "green",
  },
  loserCard: {
    backgroundColor: "black",
    borderColor: "red",
    borderWidth: 2,
    color: "red",
  },
  activeCard: {
    backgroundColor: "black",
    borderColor: "#FFF",
    borderWidth: 2,
    color: "#FFF",
  },
  card: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
  },
  body: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
  },
  titleFont: {
    color: "inherit",
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "monospace",
  },
  icon: {
    justifyContent: "center",
  },
  winnerButton: {
    color: "green",
  },
  text: {
    color: "inherit",
    // fontFamily: "monospace",
  },
});

export default Bet;
