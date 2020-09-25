import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { UserContext } from "../../context";

const DisplayMessage = ({ item }) => {
  const { uid } = useContext(UserContext);

  const message = item[1];

  return (
    <>
      {item[0] == "users" ? null : (
        <View style={styles.container}>
          {message.senderId == uid ? (
            <Text style={styles.rigthText}>{message.message}</Text>
          ) : (
            <Text style={styles.leftText}>{message.message}</Text>
          )}
        </View>
      )}
    </>
  );
};

export default DisplayMessage;

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: "white",
    margin: 5,
  },
  rigthText: {
    position: "absolute",
    right: 5,
    fontSize: 20,
    marginVertical: 2,
  },
  leftText: {
    position: "absolute",
    left: 5,
    fontSize: 20,
    marginVertical: 2,
  },
});
