import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

// firebase
import firebase from "firebase/app";

import { UserContext } from "../../context";

import { globalStyles } from "../../globalStyles";

const MessageRequestHandler = ({ friendUid }) => {
  const { uid } = useContext(UserContext);

  const [user, setUser] = useState(null);

  const [isMessageRequestSend, setIsMessageRequestSend] = useState(false);

  const getUser = async () => {
    await firebase
      .database()
      .ref("/usersPublicDetails/" + friendUid)
      .on("value", (snapshot) => {
        setUser(snapshot.val());
      });
  };

  const SendMessageReques = async () => {
    const uid1 = uid;
    const uid2 = friendUid;

    var databaseRef = firebase.database().ref();

    var chatId = databaseRef.push({}).key;

    var updatedMessageData = {};
    updatedMessageData["/users/" + uid1 + "/userChatsId/" + uid2] = chatId;
    updatedMessageData["/users/" + uid2 + "/userChatsId/" + uid1] = chatId;

    updatedMessageData["/chats/" + chatId] = {
      users: {
        uid1: uid1,
        uid2: uid2,
      },
    };

    databaseRef
      .update(updatedMessageData, function (error) {
        if (error) {
          alert("Error updating data:", error);
        }
      })
      .then(() => {
        alert(" Request Send");
        setIsMessageRequestSend(true);
      });
  };

  if (isMessageRequestSend) {
    useNavigation().navigate("MessagesList");
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: user.profileImageUrl }}
              style={globalStyles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.nameText}>{user.name}</Text>
          <View style={styles.addButton}>
            <Button title="Add" onPress={SendMessageReques} />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default MessageRequestHandler;

const styles = StyleSheet.create({
  addButton: {
    width: 80,
    position: "absolute",
    right: 10,
  },
  container: {
    backgroundColor: "white",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  profileImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 25,
    overflow: "hidden",
    marginLeft: 10,
  },
  nameText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
