import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image_container: {
    flex: 1,
  },
  back_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  white_sheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 80,
  },
  form_container: {
    flex: 2,
    paddingHorizontal: 40,
  },
  header_text: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 20,
    color: "#7953d2",
    fontWeight: "bold",
  },
  input: {
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    paddingLeft: 15,
    backgroundColor: "#e0e0e0",
    borderWidth: 0,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#4527a0",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  btn_text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  navigation_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  navigation_text: {
    color: "#4527a0",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
