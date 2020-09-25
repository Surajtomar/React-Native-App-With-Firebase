import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

// Firebase
import firebase from "firebase/app";

// Usrr Context
import { UserContext } from "../../context";

// globalStyles
import { globalStyles } from "../../globalStyles";
import AppButton from "../../components/AppButton";

const SignUp = ({ navigation }) => {
  const { uid, setUid } = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        setUid(res.user.uid);
        alert("Sign Up");
        navigation.navigate("AccounStack");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>SignUp</Text>

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

      <AppButton title="Sign Up" onPress={handleSubmit} />
    </View>
  );
};

export default SignUp;
