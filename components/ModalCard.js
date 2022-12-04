import { View, Modal, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";

const ModalCard = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.showModal}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={props.closeModal}
        >
          <TouchableOpacity style={styles.modal} activeOpacity={1}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              {props.children}
            </TouchableWithoutFeedback>
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
  // modal: {
  //   height: 300,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalCard;
