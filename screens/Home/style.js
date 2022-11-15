import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  chat_icon: {
    position: "absolute",
    bottom: 40,
    right: 30,
    padding: 15,
    backgroundColor: "#7953d2",
    borderRadius: 50,
  },
  back_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
  },
  home_text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 60,
  },
});
