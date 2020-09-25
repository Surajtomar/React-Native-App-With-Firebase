import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

// firebase
import firebase from "firebase/app";

//
import { globalStyles } from "../../globalStyles";

import ProfileCardSendRequest from "./ProfileCardSendRequest";

// context
import { UserContext } from "../../context";

const AddFriends = () => {
  const { uid } = useContext(UserContext);
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    await firebase
      .database()
      .ref("/usersPublicDetails/")
      .once("value", (snapshot) => {
        setUsers(snapshot.val());
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>List Of All Users</Text>
      {users ? (
        <FlatList
          data={Object.entries(users)}
          keyExtractor={(users) => users[0].toString()}
          renderItem={({ item }) => (
            <>
              {item[0] == uid ? null : <ProfileCardSendRequest item={item} />}
            </>
          )}
        />
      ) : null}
    </View>
  );
};

export default AddFriends;

const styles = StyleSheet.create({});
