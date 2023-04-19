import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useCallback } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { db } from "../firebase";
import { get, ref, child } from "firebase/database";
import { useDispatch } from "react-redux";
import { logIn } from "../betsSlice";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const LoginScreen = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const dbRef = ref(db);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = auth.currentUser.uid;
        await get(child(dbRef, "/bets/" + userId)).then((snapshot) => {
          const fireData = snapshot.val();
          if (fireData) {
            const arrayBets = Object.values(fireData).sort(
              (a, b) => b.date - a.date
            );
            dispatch(logIn([...arrayBets]));
          }
        });

        navigation.replace("HomeScreen");
      }
    });

    return unsubscribe;
  }, []);
  const [fontsLoaded] = useFonts({
    "Orbitron-Regular": require("../assets/fonts/Orbitron-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer} onLayout={onLayoutRootView}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontFamily: "Orbitron-Regular" }]}>
            BETBOOK
          </Text>
        </View>
        <Text style={[styles.inputTitle, , { fontFamily: "Orbitron-Regular" }]}>
          Email
        </Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input, { fontFamily: "Orbitron-Regular" }]}
          />
          <Ionicons name="person" size={24} color="white" />
        </View>
        <Text style={[styles.inputTitle, { fontFamily: "Orbitron-Regular" }]}>
          Password
        </Text>
        <View style={[styles.inputView, { fontFamily: "Orbitron-Regular" }]}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={[styles.input, { fontFamily: "Orbitron-Regular" }]}
            secureTextEntry={!showPassword}
          />
          {!showPassword && (
            <Ionicons
              name="eye"
              size={24}
              color="white"
              onPress={() => {
                setShowPassword(true);
              }}
            />
          )}

          {showPassword && (
            <View>
              <Ionicons
                name="eye-off"
                size={24}
                color="white"
                onPress={() => {
                  setShowPassword(false);
                }}
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text
            style={[
              styles.buttonOutlineText,
              { fontFamily: "Orbitron-Regular" },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text
            style={[
              styles.buttonOutlineText,
              { fontFamily: "Orbitron-Regular" },
            ]}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: 700,
    color: "#37b24d",
    textShadow: "0 0 25px #06FF00",
  },

  inputContainer: {
    width: "80%",
  },
  inputTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
  },
  inputView: {
    borderBottomWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: "grey",
    color: "white",
    backgroundColor: "transparent",
    paddingVertical: 10,
    width: "90%",
  },
  inputIcon: {
    color: "white",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: "#37b24d",
    shadowColor: "#37b24d",
    shadowOpacity: 0.7,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 10,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#37b24d",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#37b24d",
    fontWeight: "700",
    fontSize: 16,
  },
});
