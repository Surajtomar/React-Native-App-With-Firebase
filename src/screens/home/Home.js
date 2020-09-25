import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// firebase
import firebase from "firebase/app";

import { UserContext } from "../../context";
import { globalStyles } from "../../globalStyles";
import ShowPostCard from "../../components/ShowPostCard";

const Home = () => {
  const { uid } = useContext(UserContext);
  const [postsId, setPostsId] = useState(null);

  const getPostsId = async () => {
    await firebase
      .database()
      .ref("/users/" + uid + "/friendsPost/")
      .on("value", (snapshot) => {
        setPostsId(snapshot.val());
      });
  };

  useEffect(() => {
    getPostsId();
  }, []);

  return (
    <View style={globalStyles.container}>
      {postsId ? (
        <FlatList
          data={Object.entries(postsId).reverse()}
          keyExtractor={(postsId) => postsId[0].toString()}
          renderItem={({ item }) => <ShowPostCard postId={item[0]} />}
        />
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
