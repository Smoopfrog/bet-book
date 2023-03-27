import { StyleSheet, View } from "react-native";
import Home from "./components/Home/Home";
import LoginScreen from "./components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "BETBOOK" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "BETBOOK" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default App;
