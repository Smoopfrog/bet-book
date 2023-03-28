import { Feather } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SwipeableCard from "./SwipeableCard";
import moment from "moment";
import EditBetModal from "./EditBetModal";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";

const Bet = ({ item }) => {
  const [showEditBetModal, setShowEditBetModal] = useState(false);
  const [active, setActive] = useState(item.active);

  const editBetModalHandler = () => {
    setShowEditBetModal(!showEditBetModal);
  };

  const resultHandler = (result) => {
    set(ref(db, "bets/" + item.id + "/result"), result)
      .then(() => {
        console.log("Result updated");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const settledHandler = () => {
    const newActiveStatus = !active;
    
    set(ref(db, "bets/" + item.id + "/active"), newActiveStatus)
      .then(() => {
        console.log("Active status updated");
        setActive(!newActiveStatus);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const date = moment(item.date).format("MMM Do, YYYY");

  return (
    <SwipeableCard resultHandler={resultHandler} cardType={item.result}>
      <TouchableHighlight
        delayLongPress="1000"
        onLongPress={editBetModalHandler}
      >
        <View
          style={[
            styles.card,
            item.result === "winner" && styles.winnercard,
            item.result === "pending" && styles.activeCard,
            item.result === "loser" && styles.loserCard,
          ]}
        >
          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={styles.titleFont}>{item.title}</Text>
              <Text style={styles.text}>#{item.id}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.text}>{date}</Text>
              <Text style={styles.text}>{item.person}</Text>
              <Text style={styles.text}>{item.wager}</Text>
            </View>
            <View style={styles.icon}>
              <BouncyCheckbox
                fillColor={"black"}
                iconComponent={<Feather name="lock" size={15} color="white" />}
                isChecked={item.active}
                onPress={settledHandler}
              />
            </View>
          </View>
          <EditBetModal
            closeModal={editBetModalHandler}
            showModal={showEditBetModal}
            bet={item}
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
