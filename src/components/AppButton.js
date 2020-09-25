// A Button component thats wraps Button in view

import React from "react";
import { StyleSheet, Button, View } from "react-native";

const AppButton = ({ title, onPress }) => {
  return (
    <View style={styles.button}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    fontSize: 16,
  },
});
