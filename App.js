import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";

const App = () => {
  const [bets, setBets] = useState([]);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          // component={LoginScreen}
          options={{ title: "BETBOOK" }}
        >
          {() => <LoginScreen setBets={setBets} />}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          // component={Home}
          options={{ title: "BETBOOK" }}
        >
          {() => <Home bets={bets} setBets={setBets} />}
        </Stack.Screen>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
