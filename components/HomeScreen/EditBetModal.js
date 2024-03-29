import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import ModalCard from "./ModalCard";
import { set, ref } from "firebase/database";
import { db } from "../../firebase";
import { useState } from "react";
import NewBetInput from "./NewBetInput";
import { auth } from "../../firebase";

const EditBetModal = ({ showModal, closeModal, bet }) => {
  const [title, setTitle] = useState(bet.title);
  const [wager, setWager] = useState(bet.wager);
  const [person, setPerson] = useState(bet.person);
  const userId = auth.currentUser.uid;

  const deleteBet = () => {
    set(ref(db, "bets/" + userId + "/" + bet.id), null)
      .then(() => {
        alert("Bet deleted");
        closeModal();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const editBet = () => {
    const newBet = {
      active: bet.active,
      date: bet.date,
      id: bet.id,
      result: bet.result,
      person,
      title,
      wager,
      userId,
    };

    set(ref(db, "bets/" + userId + "/" + newBet.id), newBet)
      .then(() => {
        alert("Bet updated");
        closeModal();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ModalCard showModal={showModal} closeModal={closeModal}>
      <View style={styles.modalView}>
          <Text style={[styles.title, { fontFamily: "Orbitron-Regular" }]}>
            Edit your bet
          </Text>
          {/* <TouchableHighlight
              onPress={closeModal}
              style={styles.exitBtn}
            >
              <Text
                style={[
                  styles.exitBtnText,
                  { fontFamily: "Orbitron-Regular" },
                ]}
              >
                X
              </Text>
            </TouchableHighlight> */}
          <NewBetInput label="Title" value={title} changeHandler={setTitle} />
          <NewBetInput label="Wager" value={wager} changeHandler={setWager} />
          <NewBetInput
            label="Person"
            value={person}
            changeHandler={setPerson}
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={deleteBet} style={styles.deleteButton}>
              <Text
                style={[
                  styles.deleteButtonText,
                  { fontFamily: "Orbitron-Regular" },
                ]}
              >
                Delete
              </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={editBet} style={styles.saveButton}>
              <Text
                style={[
                  styles.deleteButtonText,
                  { fontFamily: "Orbitron-Regular" },
                ]}
              >
                Save
              </Text>
            </TouchableHighlight>
          </View>
        </View>
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: 300,
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
  editButton: {
    backgroundColor: "blue",
    borderRadius: 6,
    padding: 6,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  saveButton: {
    width: 100,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "green",
  },
  deleteButton: {
    width: 100,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "red",
  },
  deleteButtonText: {
    color: "white",
  },
  exitBtn: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    // backgroundColor: "red",
  },
  exitBtnText: {
    color: "black",
  },
});

export default EditBetModal;
