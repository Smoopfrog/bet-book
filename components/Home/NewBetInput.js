import { StyleSheet, Text, TextInput, View } from "react-native";

const NewBetInput = ({ label, value, changeHandler }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={changeHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%'
  },
  text: {
    fontWeight: '600'
  },
  input: {
    height: 40,
    margin: 10,
    width: '70%',
    borderWidth: 1,
    padding: 10,
  },

});
export default NewBetInput;
