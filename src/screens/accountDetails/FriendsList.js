import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

//Firebase
import firebase from "firebase/app";

import { UserContext } from "../../context";
import { globalStyles } from "../../globalStyles";
import FriendsProfileCard from "./FriendsProfileCard";

const FriendsList = () => {
  const { uid } = useContext(UserContext);

  const [friendsList, setFriendsList] = useState(null);

  const getFirendsList = async () => {
    await firebase
      .database()
      .ref("/users/" + uid + "/friendsList/")
      .once("value", (snapshot) => setFriendsList(snapshot.val()));
  };

  useEffect(() => {
    getFirendsList();
  }, []);

  return (
    <View style={globalStyles.container}>
      {friendsList ? (
        <FlatList
          data={Object.entries(friendsList)}
          keyExtractor={(friendsList) => friendsList[0].toString()}
          renderItem={({ item }) => <FriendsProfileCard friendUid={item[0]} />}
        />
      ) : null}
    </View>
  );
};

export default FriendsList;

const styles = StyleSheet.create({});
