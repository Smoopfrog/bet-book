import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";

const ModalCard = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.showModal}>
        <TouchableOpacity style={styles.modalContainer} onPress={props.closeModal}>
          <TouchableOpacity style={styles.modal} activeOpacity={1}>
            {props.children}
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
});

export default ModalCard;
