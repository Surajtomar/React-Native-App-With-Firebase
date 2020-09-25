import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";

// firebase
import firebase from "firebase/app";

import { globalStyles } from "../../globalStyles";
import ImageInput from "../../components/ImageInput";
import AppButton from "../../components/AppButton";
import { UserContext } from "../../context";

const EditUserDetails = ({ navigation }) => {
  const { uid, user } = useContext(UserContext);

  const [name, setName] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const updatePost = async () => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await firebase
      .storage()
      .ref(uid)
      .child("profileImage")
      .put(blob)
      .then(() => {
        firebase
          .storage()
          .ref(uid)
          .child("profileImage")
          .getDownloadURL()
          .then((profileImageUrl) => {
            firebase
              .database()
              .ref("/usersPublicDetails/" + uid)
              .update({
                name,
                profileImageUrl,
              })
              .then((res) => {
                alert("Details Update");
                navigation.navigate("UserAccountDetails");
              })
              .catch((error) => {
                alert(error);
              });
          });
      });
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Edit Profile Details</Text>
      {user ? (
        <Text>Fill Details to update.</Text>
      ) : (
        <Text> Fill All Details As You Came First Time.</Text>
      )}

      <ImageInput imageUri={imageUri} setImageUri={setImageUri} />

      <TextInput
        keyboardType="default"
        style={globalStyles.input}
        placeholder="Enter Name"
        onChangeText={(val) => setName(val)}
        value={name}
      />

      <AppButton title="Post" onPress={updatePost} />
    </ScrollView>
  );
};

export default EditUserDetails;

const styles = StyleSheet.create({});
