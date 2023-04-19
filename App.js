import { useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";
import { Provider } from "react-redux";
import store from "./store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Orbitron-Regular": require("./assets/fonts/Orbitron-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
            {() => <LoginScreen />}
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
                fontFamily: "Orbitron-Regular",
              },
            }}
          >
            {() => <HomeScreen />}
          </Stack.Screen>
          <Stack.Screen
            name="ProfileScreen"
            options={{
              title: "PROFILE",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
                fontFamily: "Orbitron-Regular",
              },
            }}
          >
            {() => <ProfileScreen />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
