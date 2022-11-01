import { View, Text, Button } from "react-native";
import React from "react";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/authSlice";

const Home = () => {
  const { value } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(value);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Entypo
        style={styles.chat_icon}
        name="chat"
        size={36}
        color="white"
        // onPress={() => navigation.navigate("Chat")}
        onPress={() => dispatch(increment())}
      />
    </View>
  );
};

export default Home;
