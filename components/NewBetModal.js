import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NewBetInput from "./NewBetInput";

const NewBetModal = ({ setBets, closeModal, showModal }) => {
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [wager, setWager] = useState("");
  const [desciption, setDesciption] = useState("");

  let date = Date.now();

  const createNewBet = () => {
    const newBet = {
      title,
      person,
      wager,
      desciption,
      id: date,
      date: date,
      active: true,
      result: "pending",
    };

    setBets((prev) => [newBet, ...prev]);
    closeModal();
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          <TouchableOpacity
            style={styles.modal}
            activeOpacity={1}
          >
            <View style={styles.modalView}>
              <Text>Bet area</Text>
              <NewBetInput
                label="Title"
                value={title}
                changeHandler={setTitle}
              />
              <NewBetInput
                label="Person"
                value={person}
                changeHandler={setPerson}
              />
              <NewBetInput
                label="Wager"
                value={wager}
                changeHandler={setWager}
              />
              <NewBetInput
                label="Desciption"
                value={desciption}
                changeHandler={setDesciption}
              />

              <View style={styles.buttonContainer}>
                <Button title="Close" onPress={closeModal} />
                <Button title="Confirm" onPress={createNewBet} />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: '90%',
    height: 300,
  },
});

export default NewBetModal;
