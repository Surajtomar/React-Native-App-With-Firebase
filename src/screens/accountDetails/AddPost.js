import React, { useState, useContext, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

//firebase
import firebase from "firebase/app";

// Globak Stylessheeet
import { globalStyles } from "../../globalStyles";

import { UserContext } from "../../context";

// Comonent To take input image
import ImageInput from "../../components/ImageInput";

const AddPost = ({ navigation }) => {
  const { uid } = useContext(UserContext);

  const [caption, setCaption] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [friendsList, setFriendsList] = useState(null);

  // function to upload image to furebase storage
  const updatePostImage = async () => {
    const fileName = caption.slice(0, caption.length / 2).toString();
    const response = await fetch(imageUri);
    const blob = await response.blob();

    await firebase
      .storage()
      .ref(uid)
      .child(fileName)
      .put(blob)
      .then(() => {
        firebase
          .storage()
          .ref(uid)
          .child(fileName)
          .getDownloadURL()
          .then((ImageUrl) => setPostImageUrl(ImageUrl));
      });
  };

  // function to upload post caption and image url to firebase database
  const updatePostData = async () => {
    var databaseRef = firebase.database().ref();

    var postId = databaseRef.push({}).key;

    var post = {};

    post["/users/" + uid + "/posts/" + postId] = true;

    Object.entries(friendsList).map(([key]) => {
      post["/users/" + key + "/friendsPost/" + postId] = true;
    });

    post["/posts/" + postId] = {
      caption,
      postImageUrl,
      uid,
    };

    databaseRef
      .update(post, function (error) {
        if (error) {
          alert("Error updating data:", error);
        }
      })
      .then(() => {
        alert("Post Uploade");
        setPostImageUrl(null);
        setCaption(null);
        setImageUri(null);
        navigation.navigate("UserAccountDetails");
      });
  };

  // function to get user firends list
  const getFirendsList = async () => {
    await firebase
      .database()
      .ref("/users/" + uid + "/friendsList/")
      .once("value", (snapshot) => setFriendsList(snapshot.val()));
  };

  useEffect(() => {
    getFirendsList();
  }, []);

  const handleSubmit = () => {
    updatePostImage();
  };

  // condition to check that after postImageUrl recive from firebase storage than only run updatePostData function
  if (postImageUrl && friendsList) updatePostData();

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Text style={globalStyles.titleText}>EditAccountDetails</Text>

        <ImageInput imageUri={imageUri} setImageUri={setImageUri} />

        <TextInput
          keyboardType="default"
          style={globalStyles.input}
          placeholder="Enter Caption"
          onChangeText={(val) => setCaption(val)}
          value={caption}
        />

        <Button title="Post" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({});
