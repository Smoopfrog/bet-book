import { useEffect, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Switch,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const SortModal = ({
  showModal,
  closeModal,
  sortBetsAlphabetically,
  sortBetsChronologically,
  filterAllBets,
  filterActiveBets,
  filterSettledBets,
  activeFilter,
}) => {
  const [filterAllButton, setFilterAllButton] = useState();
  const [filterActiveButton, setFilterActiveButton] = useState();
  const [filterSettledButton, setFilterSettledButton] = useState();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);
  useEffect(() => {
    if (isEnabled) {
      sortBetsChronologically();
    } else {
      sortBetsAlphabetically();
    }
  }, [isEnabled]);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilterAllButton(true);
      setFilterActiveButton(false);
      setFilterSettledButton(false);
    }
    if (activeFilter === "active") {
      setFilterAllButton(false);
      setFilterActiveButton(true);
      setFilterSettledButton(false);
    }
    if (activeFilter === "settled") {
      setFilterAllButton(false);
      setFilterActiveButton(false);
      setFilterSettledButton(true);
    }
  }, [activeFilter]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          <TouchableOpacity style={styles.modal} activeOpacity={1}>
            <View style={styles.modalView}>
              <View>
                <Text>Sort by:</Text>
              </View>
              <View style={styles.sortContainer}>
                <Text>A-Z</Text>
                <Switch
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Text>Date</Text>
              </View>
              <View>
                <View>
                  <Text>All</Text>
                  <Switch
                    onValueChange={filterAllBets}
                    value={filterAllButton}
                  />
                </View>
                <View>
                  <Text>Active</Text>
                  <Switch
                    onValueChange={filterActiveBets}
                    value={filterActiveButton}
                  />
                </View>
                <View>
                  <Text>Settled</Text>
                  <Switch
                    onValueChange={filterSettledBets}
                    value={filterSettledButton}
                  />
                </View>
              </View>
              <Button title="Close" onPress={closeModal} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  centeredView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 300,
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
    height: 300,
  },
});

export default SortModal;
