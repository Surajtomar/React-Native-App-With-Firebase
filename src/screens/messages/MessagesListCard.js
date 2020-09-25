import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// Firebase
import firebase from "firebase/app";
import { globalStyles } from "../../globalStyles";

const MessagesListCard = ({ userUid }) => {
  const [messagesSenderDetails, setMessagesSenderDetails] = useState(null);

  const getMessagesSenderDetails = async () => {
    await firebase
      .database()
      .ref("usersPublicDetails/" + userUid)
      .once("value", (snapshot) => setMessagesSenderDetails(snapshot.val()));
  };

  useEffect(() => {
    getMessagesSenderDetails();
  }, []);

  return (
    <>
      {messagesSenderDetails ? (
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: messagesSenderDetails.profileImageUrl }}
              style={globalStyles.image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.profileText}>{messagesSenderDetails.name}</Text>
        </View>
      ) : null}
    </>
  );
};

export default MessagesListCard;

const styles = StyleSheet.create({
  profileText: {
    marginHorizontal: 12,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 80,
    margin: 10,
  },
  profileImageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginLeft: 10,
  },
});
