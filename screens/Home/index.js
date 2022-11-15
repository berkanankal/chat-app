import { View, Text, ImageBackground } from "react-native";
import React from "react";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/home-image.jpg")}
        style={styles.back_image}
      >
        <Text style={styles.home_text}>
          Welcome to the Messages App!
        </Text>
      </ImageBackground>
      <Entypo
        style={styles.chat_icon}
        name="chat"
        size={36}
        color="white"
        onPress={() => navigation.navigate("Messages")}
      />
    </View>
  );
};

export default Home;
