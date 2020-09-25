import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

// firebase
import firebase from "firebase/app";

import { globalStyles } from "../../globalStyles";
import { UserContext } from "../../context";
import MessagesListCard from "./MessagesListCard";

const MessagesList = ({ navigation }) => {
  const { uid } = useContext(UserContext);

  const [messagesList, setMessagesList] = useState([]);

  const getMessagesList = async () => {
    try {
      await firebase
        .database()
        .ref("/users/" + uid + "/userChatsId/")
        .on("value", (snapshot) => {
          setMessagesList(snapshot.val());
        });
    } catch (error) {
      alert("Error", error);
    }
  };

  useEffect(() => {
    getMessagesList();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>MessagesList</Text>
      <View style={globalStyles.button}>
        <Button
          title="New Message"
          onPress={() => navigation.navigate("NewMessages")}
        />
      </View>
      {messagesList ? (
        <FlatList
          data={Object.entries(messagesList)}
          keyExtractor={(messagesList) => messagesList[0].toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Messages", item[1])}
            >
              <MessagesListCard userUid={item[0]} />
            </TouchableOpacity>
          )}
        />
      ) : null}
    </View>
  );
};

export default MessagesList;

const styles = StyleSheet.create({});
