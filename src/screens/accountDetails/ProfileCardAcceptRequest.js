import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

// firebase
import firebase from "firebase/app";

import { globalStyles } from "../../globalStyles";
import { UserContext } from "../../context";

const ProfileCardAcceptRequest = ({ senderUid }) => {
  const { uid } = useContext(UserContext);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    await firebase
      .database()
      .ref("/usersPublicDetails/" + senderUid)
      .on("value", (snapshot) => {
        setUser(snapshot.val());
      });
  };

  const acceptRequest = async () => {
    var databaseRef = firebase.database().ref("users");

    var key = databaseRef.push({}).key;

    var updatedMessageData = {};
    updatedMessageData[uid + "/friendsList/" + senderUid] = true;
    updatedMessageData[uid + "/friendRequest/" + senderUid] = null;
    updatedMessageData[senderUid + "/friendsList/" + uid] = true;

    databaseRef
      .update(updatedMessageData, function (error) {
        if (error) {
          alert("Error updating data:", error);
        }
      })
      .then(() => {
        alert("Added to Friends List");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.profileCardContainer}>
      {user ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: user.profileImageUrl }}
              style={globalStyles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.nameText}> {user.name}</Text>
          <View style={styles.acceptRequest}>
            <Button title="Accept Request" onPress={acceptRequest} />
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ProfileCardAcceptRequest;

const styles = StyleSheet.create({
  acceptRequest: {
    alignSelf: "center",
    position: "absolute",
    right: 7,
  },
  profileCardContainer: {
    height: 100,
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 5,
  },
  imageContainer: {
    height: 80,
    width: 80,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  nameText: {
    marginLeft: 20,
    alignSelf: "center",
    fontSize: 20,
    fontFamily: "Roboto",
  },
});
