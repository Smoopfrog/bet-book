import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";

const App = () => {
  const [bets, setBets] = useState([]);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
          {() => <LoginScreen setBets={setBets} />}
        </Stack.Screen>
        <Stack.Screen name="HomeScreen" options={{ title: "BETBOOK" }}>
          {() => <HomeScreen bets={bets} setBets={setBets} />}
        </Stack.Screen>
        <Stack.Screen name="ProfileScreen" options={{ title: "Profile" }}>
          {() => <ProfileScreen bets={bets} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
