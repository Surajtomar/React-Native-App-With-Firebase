// A components to show post that take postId by props then fetch post details from database and show

import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// firebase
import firebase from "firebase/app";

// Global StylesSheet
import { globalStyles } from "../globalStyles";

// Context
import { UserContext } from "../context";

const ShowPostCard = ({ postId }) => {
  const { uid } = useContext(UserContext);

  const [postData, setPostData] = useState(null);
  const [postOwnerDetails, setPostOwnerDetails] = useState(null);

  // Function to fetch post details form database
  const getPostData = async () => {
    await firebase
      .database()
      .ref("/posts/" + postId)
      .once("value", (snapshot) => setPostData(snapshot.val()));
  };

  // function to fecth details of post owner
  const getpostOwnerDetails = async () => {
    await firebase
      .database()
      .ref("/usersPublicDetails/" + postData.uid)
      .once("value", (snapshot) => setPostOwnerDetails(snapshot.val()));
  };

  useEffect(() => {
    if (postData) {
      if (postData.uid != uid) {
        getpostOwnerDetails();
      }
    }
  }, [postData]);
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <View style={styles.cardContainer}>
      {postData ? (
        <>
          {postOwnerDetails ? (
            <View style={styles.profileContainer}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: postOwnerDetails.profileImageUrl }}
                  style={globalStyles.image}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.profileText}>{postOwnerDetails.name}</Text>
            </View>
          ) : null}
          <View style={styles.postImageContainer}>
            <Image
              source={{ uri: postData.postImageUrl }}
              style={globalStyles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.caption}>{postData.caption}</Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ShowPostCard;
const styles = StyleSheet.create({
  cardContainer: {
    alignContent: "center",
    backgroundColor: "white",
    margin: 10,

    flexDirection: "column",
  },
  caption: {
    marginTop: 5,
    marginLeft: 10,
  },

  cardFooter: {
    position: "absolute",
    bottom: 5,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  postImageContainer: {
    height: 250,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 75,
  },

  profileText: {
    marginHorizontal: 12,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  profileImageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginLeft: 10,
  },
});
