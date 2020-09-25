// main screen of user account

import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
} from "react-native";

// firebase
import firebase from "firebase/app";

import { globalStyles } from "../../globalStyles";
import { UserContext } from "../../context";
import ShowFriendsRequest from "./ShowFriendsRequest";
import AppButton from "../../components/AppButton";
import ShowPost from "./ShowPost";

const UserAccountDetails = ({ navigation }) => {
  const { uid, user, setUser } = useContext(UserContext);

  const getUser = async () => {
    await firebase
      .database()
      .ref("/usersPublicDetails/" + uid)
      .on("value", (snapshot) => {
        setUser(snapshot.val());
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Text style={globalStyles.titleText}>UserAccountDetails</Text>

        {user ? (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: user.profileImageUrl }}
                style={styles.image}
              />
            </View>
            <Text>{user.name}</Text>
          </>
        ) : null}

        <AppButton
          title="Edit"
          onPress={() => navigation.navigate("EditUserDetails")}
        />

        <View style={styles.buttonContainer}>
          <AppButton
            title="Add Post "
            onPress={() => navigation.navigate("AddPost")}
          />
          <AppButton
            title="Add Friends"
            onPress={() => navigation.navigate("AddFriends")}
          />
          <AppButton
            title="Friends List"
            onPress={() => navigation.navigate("FriendsList")}
          />
        </View>

        <View>
          <ShowFriendsRequest />
        </View>
        <View>
          <ShowPost />
        </View>
      </ScrollView>
    </View>
  );
};

export default UserAccountDetails;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    height: 50,
    marginVertical: 5,
    alignContent: "center",
    justifyContent: "space-evenly",
  },
});
