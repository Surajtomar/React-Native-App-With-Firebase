import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

// firebase
import firebase from "firebase/app";

import { globalStyles } from "../../globalStyles";
import { UserContext } from "../../context";

const ProfileCardSendRequest = ({ item }) => {
  const { uid } = useContext(UserContext);

  const sendRequest = async () => {
    const senderUid = uid;
    await firebase
      .database()
      .ref("/users/" + item[0] + "/friendRequest/" + senderUid)
      .set(true)
      .then(() => alert("Friends request send successfully"));
  };

  return (
    <View style={styles.profileCardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item[1].profileImageUrl }}
          style={globalStyles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.nameText}> {item[1].name}</Text>
      <View style={styles.sendRequestButton}>
        <Button title="Send Request" onPress={sendRequest} />
      </View>
    </View>
  );
};

export default ProfileCardSendRequest;

const styles = StyleSheet.create({
  sendRequestButton: {
    alignSelf: "center",
    position: "absolute",
    right: 7,
    width: 80,
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
    marginLeft: 10,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});
