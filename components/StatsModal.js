import { View, StyleSheet } from "react-native";
import ModalCard from "./ModalCard";

const StatsModal = ({ showModal, closeModal }) => {
  return (
    <ModalCard showModal={showModal} closeModal={closeModal}>
      <View style={styles.modalView}></View>
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
});

export default StatsModal;
