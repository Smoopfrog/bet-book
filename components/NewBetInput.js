import { StyleSheet, Text, TextInput, View } from "react-native";


const NewBetInput = ({label, value, changeHandler}) => {
  return (
    <View style={styles.rowContainer}>
      <Text>{label}</Text>
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
  },
  text: {
    flex: 1,
  },
  input: {
    flex: 3,
    height: 40,
    margin: 12,
    width: 100,
    borderWidth: 1,
    padding: 10,
  },
})
export default NewBetInput