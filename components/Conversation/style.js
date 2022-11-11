import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 13,
  },
  image: { width: 60, height: 60, borderRadius: 30 },
  right_container: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 5,
  },
  right_container_left: { marginLeft: 15 },
  username: {
    fontWeight: "bold",
  },
  last_message: {
    color: "grey",
    marginTop: 5,
  },
  right_container_right: {
    marginLeft: "auto",
  },
  date: {
    color: "grey",
  },
});
