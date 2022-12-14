import { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import NewBetInput from "./NewBetInput";
import ModalCard from "./ModalCard";

const createTwoButtonAlert = (msg) =>
  Alert.alert("Missing Info", msg, [
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);

const NewBetModal = ({ setBets, closeModal, showModal }) => {
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

    setBets((prev) => [newBet, ...prev]);
    closeModal();
  };

  return (
    <ModalCard showModal={showModal} closeModal={closeModal}>
      <View style={styles.modalView}>
        <Text>Bet area</Text>
        <NewBetInput label="Title" value={title} changeHandler={setTitle} />
        <NewBetInput label="Person" value={person} changeHandler={setPerson} />
        <NewBetInput label="Wager" value={wager} changeHandler={setWager} />
        <View style={styles.buttonContainer}>
          <Button title="Close" onPress={closeModal} />
          <Button title="Confirm" onPress={createNewBet} />
        </View>
      </View>
      
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
    flexDirection: "row",
  },
});

export default NewBetModal;
