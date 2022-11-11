import { View, Text } from "react-native";
import React from "react";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {} from "../../redux/authSlice";

const Home = () => {
  const { value } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Entypo
        style={styles.chat_icon}
        name="chat"
        size={36}
        color="white"
        onPress={() => navigation.navigate("Conversations")}
      />
    </View>
  );
};

export default Home;
