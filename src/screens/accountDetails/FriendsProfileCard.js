import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
//Firebase
import firebase from "firebase/app";
import { globalStyles } from "../../globalStyles";

const FriendsProfileCard = ({ friendUid }) => {
  const [firendProfileDetails, setFirendProfileDetails] = useState(null);

  const getFirendProfileDetails = async () => {
    await firebase
      .database()
      .ref("/usersPublicDetails/" + friendUid)
      .on("value", (snapshot) => {
        setFirendProfileDetails(snapshot.val());
      });
  };

  useEffect(() => {
    getFirendProfileDetails();
  }, []);

  return (
    <View style={styles.profileCardContainer}>
      {firendProfileDetails ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: firendProfileDetails.profileImageUrl }}
              style={globalStyles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.nameText}> {firendProfileDetails.name}</Text>
        </>
      ) : null}
    </View>
  );
};

export default FriendsProfileCard;

const styles = StyleSheet.create({
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
