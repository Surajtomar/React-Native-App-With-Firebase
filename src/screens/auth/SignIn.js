import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

// Firebase
import firebase from "firebase/app";
import { globalStyles } from "../../globalStyles";
import { UserContext } from "../../context";
import AppButton from "../../components/AppButton";

const SignIn = ({ navigation }) => {
  const { uid, setUid } = useContext(UserContext);
  const [email, setEmail] = useState("s@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleSignUp = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUid(res.user.uid);
        alert("Sign in");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  if (uid) {
    navigation.navigate("AccounStack");
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Sign In</Text>

      <TextInput
        keyboardType="email-address"
        style={globalStyles.input}
        placeholder="Enter Email"
        onChangeText={(val) => setEmail(val)}
        value={email}
      />
      <TextInput
        secureTextEntry
        style={globalStyles.input}
        placeholder="Enter Password"
        onChangeText={(val) => setPassword(val)}
        value={password}
      />

      <AppButton title="Sign In" onPress={handleSubmit} />

      <Text>If new User sign Up</Text>

      <AppButton
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginVertical: 12,
    alignSelf: "center",
  },
});
