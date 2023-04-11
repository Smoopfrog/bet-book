import { Feather } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SwipeableCard from "./SwipeableCard";
import moment from "moment";
import EditBetModal from "./EditBetModal";
import { useEffect, useState } from "react";
// import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { get, ref, child, set } from "firebase/database";

const Bet = ({ bet, setBets }) => {
  const [showEditBetModal, setShowEditBetModal] = useState(false);
  const [active, setActive] = useState(bet.active);
  const dbRef = ref(db);

  // useEffect(() => {
  //   get(child(dbRef, "/bets")).then((snapshot) => {
  //     const fireData = snapshot.val();
  //     const arrayBets = Object.values(fireData);
  //     console.log("result change bets", arrayBets);
  //     setBets([...arrayBets]);
  //     // navigation.replace("Home");
  //   });
  // }, [bet.result]);

  const editBetModalHandler = () => {
    setShowEditBetModal(!showEditBetModal);
  };

  const resultHandler = (result) => {
    set(ref(db, "bets/" + bet.id + "/result"), result)
      .then(() => {
        console.log("Result updated to: ", result);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const settledHandler = () => {
    const newActiveStatus = !active;

    set(ref(db, "bets/" + bet.id + "/active"), newActiveStatus)
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
        >
          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={styles.titleFont}>{bet.title}</Text>
              <Text style={styles.text}>#{bet.id}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.text}>{date}</Text>
              <Text style={styles.text}>{bet.person}</Text>
              <Text style={styles.text}>{bet.wager}</Text>
            </View>
            <View style={styles.icon}>
              <BouncyCheckbox
                fillColor={"black"}
                iconComponent={<Feather name="lock" size={15} color="white" />}
                isChecked={!bet.active}
                onPress={settledHandler}
              />
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
    backgroundColor: "green",
  },
  loserCard: {
    backgroundColor: "red",
  },
  activeCard: {
    backgroundColor: "#FFAC41",
  },
  card: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    alignItems: "center",
  },
  titleFont: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    justifyContent: "center",
  },
  winnerButton: {
    color: "green",
  },
  text: {
    color: "white",

  },
});

export default Bet;
