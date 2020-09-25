import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

// firebase
import firebase from "firebase/app";

import { UserContext } from "../../context";
import ProfileCardAcceptRequest from "./ProfileCardAcceptRequest";

const ShowFriendsRequest = () => {
  const { uid } = useContext(UserContext);

  const [frindsRequest, setFrindsRequest] = useState(null);

  const getFrindsRequest = async () => {
    await firebase
      .database()
      .ref("/users/" + uid + "/friendRequest/")
      .on("value", (snapshot) => {
        setFrindsRequest(snapshot.val());
      });
  };

  useEffect(() => {
    getFrindsRequest();
  }, []);

  return (
    <View>
      {frindsRequest ? (
        <FlatList
          data={Object.entries(frindsRequest)}
          keyExtractor={(frindsRequest) => frindsRequest[0].toString()}
          renderItem={({ item }) => (
            <ProfileCardAcceptRequest senderUid={item[0]} />
          )}
        />
      ) : null}
    </View>
  );
};

export default ShowFriendsRequest;

const styles = StyleSheet.create({});
