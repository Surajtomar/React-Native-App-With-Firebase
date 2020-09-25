import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

// firebase
import firebase from "firebase/app";

import { globalStyles } from "../../globalStyles";
import { UserContext } from "../../context";
import MessageRequestHandler from "./MessageRequestHandler";

const NewMessages = () => {
  const { uid } = useContext(UserContext);

  const [friendsList, setFriendsList] = useState(null);
  const [UserChatsId, setUserChatsId] = useState(null);

  const getFirendsList = async () => {
    await firebase
      .database()
      .ref("/users/" + uid + "/friendsList/")
      .once("value", (snapshot) => {
        setFriendsList(snapshot.val());
      });
  };

  const getUserChatsId = async () => {
    await firebase
      .database()
      .ref("/users/" + uid + "/userChatsId/")
      .once("value", (snapshot) => {
        if (snapshot.val()) {
          setUserChatsId(snapshot.val());
        } else {
          setUserChatsId("null");
        }
      });
  };

  useEffect(() => {
    getFirendsList();
  }, []);

  useEffect(() => {
    getUserChatsId();
  }, []);

  if (friendsList && UserChatsId && !Array.isArray(friendsList)) {
    var friendsListTemp = Object.entries(friendsList);

    if (UserChatsId != "null") {
      Object.entries(UserChatsId).map(([key, value]) => {
        friendsListTemp = friendsListTemp.filter((list) => list[0] !== key);
      });
      setFriendsList(friendsListTemp);
    } else {
      setFriendsList(friendsListTemp);
    }
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>New Messages</Text>

      <View style={globalStyles.button}>
        <Button title="Get Users" onPress={getFirendsList} />
      </View>

      {friendsList && Array.isArray(friendsList) ? (
        <FlatList
          data={friendsList}
          keyExtractor={(friendsList) => friendsList[0].toString()}
          renderItem={({ item }) => (
            <MessageRequestHandler friendUid={item[0]} />
          )}
        />
      ) : null}
    </View>
  );
};

export default NewMessages;

const styles = StyleSheet.create({});
