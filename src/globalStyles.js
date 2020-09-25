import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#EAF0F1",
  },
  titleText: {
    fontSize: 24,
    marginVertical: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 20,
    borderRadius: 6,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
