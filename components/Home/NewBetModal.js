import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import NewBetInput from "./NewBetInput";
import ModalCard from "./ModalCard";

const createTwoButtonAlert = (msg) =>
  Alert.alert("Missing Info", msg, [
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);

const NewBetModal = ({ closeModal, showModal }) => {
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [wager, setWager] = useState("");

  let date = Date.now();

  const createNewBet = () => {
    if (!title) {
      createTwoButtonAlert("Please enter a title");
      return;
    }

    if (!person) {
      createTwoButtonAlert("Please enter a person");
      return;
    }
    if (!wager) {
      createTwoButtonAlert("Please enter a wager");
      return;
    }

    const newBet = {
      title,
      person,
      wager,
      id: date,
      date: date,
      active: true,
      result: "pending",
    };

    set(ref(db, "bets/" + newBet.id), newBet)
      .then(() => {
        alert("Bet added");
      })
      .catch((error) => {
        alert(error);
      });

    closeModal();
  };

  return (
    <ModalCard showModal={showModal} closeModal={closeModal}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.modalView}>
          <Text>Bet area</Text>
          <NewBetInput label="Title" value={title} changeHandler={setTitle} />
          <NewBetInput
            label="Person"
            value={person}
            changeHandler={setPerson}
          />
          <NewBetInput label="Wager" value={wager} changeHandler={setWager} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
              <Text style={styles.innerBtn}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={createNewBet}>
              <Text style={styles.innerBtn}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 60,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  closeBtn: {
    width: 100,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "red",
  },
  confirmBtn: {
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

export default NewBetModal;
