import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

const NewBetModal = (props) => {
  const [title, setTitle] = useState("");

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.showModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <Text>Bet area</Text>
          <Button title="Close" onPress={props.closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: 100,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
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
