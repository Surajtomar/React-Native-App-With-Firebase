import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from "react-native";

// firebase
import firebase from "firebase/app";
import { globalStyles } from "../../globalStyles";
import DisplayMessage from "./DisplayMessage";
import { UserContext } from "../../context";

const Messages = ({ route }) => {
  const { uid } = useContext(UserContext);
  const chatId = route.params;

  const [messages, setMessages] = useState({});
  const [textMessagesToSend, setTextMessagesToSend] = useState(null);

  const getMessages = async () => {
    try {
      await firebase
        .database()
        .ref("/chats/" + chatId)
        .limitToLast(150)
        .on("value", (snapshot) => {
          setMessages(snapshot.val());
        });
    } catch (error) {
      alert(error);
    }
  };

  const sendMessage = async () => {
    let message = textMessagesToSend;
    let senderId = uid;
    try {
      await firebase
        .database()
        .ref("/chats/" + chatId)
        .push({
          message,
          senderId,
        })
        .then(() => setTextMessagesToSend(""));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Button title="New Message" />

      {messages ? (
        <FlatList
          data={Object.entries(messages).reverse()}
          inverted={-1}
          keyExtractor={(messages) => messages[0].toString()}
          renderItem={({ item }) => <DisplayMessage item={item} />}
        />
      ) : null}

      <TextInput
        keyboardType="default"
        style={globalStyles.input}
        placeholder="Enter Messages"
        onChangeText={(val) => setTextMessagesToSend(val)}
        value={textMessagesToSend}
      />

      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({});
