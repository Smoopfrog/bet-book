import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import NewBetInput from "./NewBetInput";

const NewBetModal = (props) => {
  const [title, setTitle] = useState("");
  const [wager, setWager] = useState("");
  const [person, setPerson] = useState("");

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.showModal}>
        <View style={styles.modalView}>
          <Text>Bet area</Text>
          <NewBetInput label="Title" value={title} changeHandler={setTitle} />
          <View style={styles.rowContainer}>
            <Text>Title</Text>
            <TextInput
              label="Title"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text>Person</Text>
            <TextInput
              style={styles.input}
              value={person}
              onChangeText={setPerson}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>Wager</Text>
            <TextInput
              style={styles.input}
              value={wager}
              onChangeText={setWager}
            />
          </View>
          <Button title="Close" onPress={props.closeModal} />
          <Button title="Confirm" onPress={props.closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
});

export default NewBetModal;
