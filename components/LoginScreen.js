import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
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

const LoginScreen = ({ setBets }) => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const dbRef = ref(db);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await get(child(dbRef, "/bets")).then((snapshot) => {
          const fireData = snapshot.val();
          const arrayBets = Object.values(fireData).sort(
            (a, b) => b.date - a.date
          );
          setBets(arrayBets);
          console.log(arrayBets);
          dispatch(logIn([...arrayBets]));
        });

        navigation.replace("HomeScreen");
      }
    });

    return unsubscribe;
  }, []);

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
      <View style={styles.inputContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>BETBOOK</Text>
        </View>
        <Text style={styles.inputTitle}>Email</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <Ionicons name="person" size={24} color="white" />
        </View>
        <Text style={styles.inputTitle}>Password</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
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
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
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
    fontWeight: 600

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
    shadowOpacity: 1,
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
