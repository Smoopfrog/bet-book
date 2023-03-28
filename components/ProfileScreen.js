import { Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.mess));
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <TouchableHighlight onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ProfileScreen;
