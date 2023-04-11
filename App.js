import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  const [bets, setBets] = useState([]);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
            {() => <LoginScreen setBets={setBets} />}
          </Stack.Screen>
          <Stack.Screen
            name="HomeScreen"
            options={{
              title: "BETBOOK",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
              },
            }}
          >
            {() => <HomeScreen bets={bets} setBets={setBets} />}
          </Stack.Screen>
          <Stack.Screen
            name="ProfileScreen"
            options={{
              title: "Profile",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
              },
            }}
          >
            {() => <ProfileScreen bets={bets} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
