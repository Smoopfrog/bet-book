import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import ModalCard from "./ModalCard";
import { set, ref } from "firebase/database";
import { db } from "../../firebase";
import { useState } from "react";
import NewBetInput from "./NewBetInput";

const EditBetModal = ({ showModal, closeModal, bet }) => {
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState(bet.title);
  const [wager, setWager] = useState(bet.wager);
  const [person, setPerson] = useState(bet.person);

  const editModeHandler = () => {
    setEditMode(!editMode);
  };

  const deleteBet = () => {
    set(ref(db, "bets/" + bet.id), null)
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
    };

    set(ref(db, "bets/" + bet.id), newBet)
      .then(() => {
        alert("Bet updated");
        setEditMode(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ModalCard showModal={showModal} closeModal={closeModal}>
      <View style={styles.modalView}>
        {/* <TouchableHighlight onPress={editModeHandler} style={styles.editButton}>
          <Text style={styles.deleteButtonText}>Edit</Text>
        </TouchableHighlight> */}
        {editMode ? (
          <View>
            <Text style={styles.title}>Edit your bet</Text>
            <NewBetInput label="Title" value={title} changeHandler={setTitle} />
            <NewBetInput label="Wager" value={wager} changeHandler={setWager} />
            <NewBetInput
              label="Person"
              value={person}
              changeHandler={setPerson}
            />
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={closeModal}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={editBet} style={styles.saveButton}>
                <Text style={styles.deleteButtonText}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <View>
            <Text>{bet.title}</Text>
            <Text>{bet.wager}</Text>
            <Text>{bet.person}</Text>
            <TouchableHighlight onPress={deleteBet} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableHighlight>
          </View>
        )}
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
    fontSize: "24px",
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
});

export default EditBetModal;
