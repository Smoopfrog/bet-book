import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import ModalCard from "./ModalCard";
import { set, ref } from "firebase/database";
import { db } from "../../firebase";

const EditBetModal = ({ showModal, closeModal, bet }) => {
  const deleteBet = () => {
    set(ref(db, "bets/" + bet.id), null)
      .then(() => {
        alert("Bet deleted");
        closeModal()
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ModalCard showModal={showModal} closeModal={closeModal}>
      <View style={styles.modalView}>
        <Text>Bet {bet.wager}</Text>
        <Text>Bet {bet.wager}</Text>
        <TouchableHighlight
          onPress={deleteBet}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableHighlight>
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
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 6,
    padding: 6,
  },
  deleteButtonText: {
    color: "white",
  },
});

export default EditBetModal;
