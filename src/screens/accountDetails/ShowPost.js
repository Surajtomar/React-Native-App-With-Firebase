// components to fetch user post list and call showPostCard by flatlist to show deetails of post
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

// firebase
import firebase from "firebase/app";

import { UserContext } from "../../context";
import ShowPostCard from "../../components/ShowPostCard";

const ShowPost = () => {
  const { uid } = useContext(UserContext);
  const [postsId, setPostsId] = useState(null);

  // function to fetch post list of user
  const getPostsId = async () => {
    await firebase
      .database()
      .ref("/users/" + uid + "/posts")
      .on("value", (snapshot) => setPostsId(snapshot.val()));
  };

  useEffect(() => {
    getPostsId();
  }, []);

  return (
    <View>
      {postsId ? (
        <FlatList
          data={Object.entries(postsId)}
          keyExtractor={(postsId) => postsId[0].toString()}
          renderItem={({ item }) => <ShowPostCard postId={item[0]} />}
        />
      ) : null}
    </View>
  );
};

export default ShowPost;

const styles = StyleSheet.create({});
