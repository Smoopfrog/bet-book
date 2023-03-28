import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.mess));
  };

  const backHandler = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <TouchableHighlight style={styles.logoutButton} onPress={logoutHandler}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.backButton} onPress={backHandler}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "red",
    padding: 6,
  },
  backButton: {
    backgroundColor: "black",
    padding: 6,
  },
  buttonText: {
    color: "white",
  },


});

export default ProfileScreen;
